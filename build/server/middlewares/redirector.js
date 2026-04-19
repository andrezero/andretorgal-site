export function redirector(targetUrl) {
    return (req, res, next) => {
        if (req.path !== '/') {
            return next();
        }

        res.setHeader('Location', targetUrl);
        res.status(301).send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting</title>
<meta http-equiv="refresh" content="0; url=${targetUrl}">
</head>
<body>
<pre>Redirecting to ${targetUrl}</pre>
</body>
</html>
    `);
    };
}
