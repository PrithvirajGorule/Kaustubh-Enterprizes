const sendEmail = async (to, subject, text) => {
    const response = await fetch('https://kaustubh-enterprizes.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, text }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  
    const data = await response.json();
    return data;
  };
  