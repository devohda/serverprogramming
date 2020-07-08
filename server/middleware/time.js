// requset가 발생한 시간을 log에 표시하는 미들웨어
exports.dateNow = (req, res, next) => {
  const dateTime = () => {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    const dateString = dateLocal
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, "/")
      .replace("T", " ");
    return dateString;
  };

  console.log(dateTime());
  res.locals.time = dateTime();
  next();
};
