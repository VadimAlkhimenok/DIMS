import emailjs from 'emailjs-com'

export const sendEmail = data => {
  emailjs.sendForm('dims', 'dims_email', data, 'user_nchpofRflrXYg5BUr8uNS')
    .then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
}