/**
 * Code to make textarea auto-grow
 * See: https://stackoverflow.com/a/25621277
 */
 (() => {
  const onInput = function() {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
  };
  const textareas = document.getElementsByTagName('textarea');
  for (let i = 0; i < textareas.length; i++) {
    const textarea = textareas[i];
    textarea.style['height'] = `${textarea.scrollHeight}px`;
    textarea.style['overflow-y'] = 'hidden';
    textarea.addEventListener('input', onInput);
  }
})();



/**
 * Code to send the axios request
 */
async function sendRequest() {
  const message = document.getElementById('message');
  const response = document.getElementById('response');
  message.innerHTML = '';
  response.className = 'no-show';

  let params;
  try {
    const textarea = document.getElementById('prompt');
    const body = `return {${textarea.value}};`;
    params = (new Function(body))();
  } catch (error) {
    message.innerHTML = 'Request not sent';
    message.className = 'has-error';
    response.innerHTML = 'There is an error in your request syntax. Please check and try again.';
    response.className = 'code has-error';
    return;
  }

  if (!params || !params.url) {
    message.innerHTML = 'Request not sent';
    message.className = 'has-error';
    response.innerHTML = 'You must provide a url to receive a response.';
    response.className = 'code has-error';
    return;
  }

  try {
    message.innerHTML = 'Sending request';
    message.className = '';
    const result = await axios(params);
    response.innerText = JSON.stringify(result, null, 4);
    response.className = 'code has-success';
    message.innerHTML = 'Success response received';
    message.className = 'has-success';
  } catch (error) {
    response.innerText = JSON.stringify(error, null, 4);
    response.className = 'code has-error';
    message.innerHTML = 'Error response received';
    message.className = 'has-error';
    return;
  }
}