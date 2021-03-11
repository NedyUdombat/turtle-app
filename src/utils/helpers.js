const formatTimeToString = val => {
  const hour = parseInt(val / 60);
  let mins = parseInt(val % 60);

  return (
    (hour !== 0 ? `${hour}h` : '') +
    (mins !== 0 ? ' ' : '') +
    (mins !== 0 ? `${mins}m` : '')
  );
};

export { formatTimeToString };
