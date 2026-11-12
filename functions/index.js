export async function onRequest(context) {
  const userAgent = context.request.headers.get("user-agent") || "";
  
  // 1. Social media crawlers/bots ki pehchan
  const isBot = /facebookexternalhit|WhatsApp|Twitterbot|TelegramBot|LinkedInBot|Discordbot/i.test(userAgent);

  if (isBot) {
    const ogHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta property="og:title" content="🩷❤️🩵🩷❤️" />
        <meta property="og:description" content="Yahan Apni Description Likhein" />
        <meta property="og:image" content="https://raw.githubusercontent.com/awbhund-art/fafv/refs/heads/main/7981647689944298232.jpg" />
        <meta property="og:type" content="website" />
      </head>
      <body></body>
      </html>
    `;
    return new Response(ogHtml, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  }

  // 2. Agar Windows User hai, toh google.com par redirect karein
  const isWindows = /Windows NT/i.test(userAgent);
  
  if (isWindows) {
    return Response.redirect("https://google.com", 302);
  }

   // 3. Baqi sab (Mobile users) ko bina redirect ke asli index.html dikhayein
  return context.next();
}
