// Converting a wall-clock birth time in an IANA time zone to a UTC instant.
// Relies on the browser's tz database, which includes historical DST rules.

function zoneOffsetMinutes(timeZone, utcMs) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(new Date(utcMs));
  const v = Object.fromEntries(parts.map((p) => [p.type, Number(p.value)]));
  const asUtc = Date.UTC(v.year, v.month - 1, v.day, v.hour, v.minute, v.second);
  return Math.round((asUtc - Math.floor(utcMs / 1000) * 1000) / 60000);
}

// `local` = { year, month (1-12), day, hour, minute }.
// `zone` is an IANA name, or a fixed offset in hours (number).
export function localToUtc(local, zone) {
  const wall = Date.UTC(local.year, local.month - 1, local.day, local.hour, local.minute);
  if (typeof zone === 'number') return new Date(wall - zone * 3600000);
  let guess = wall;
  for (let i = 0; i < 3; i++) guess = wall - zoneOffsetMinutes(zone, guess) * 60000;
  return new Date(guess);
}

export function offsetLabel(zone, date) {
  const mins = typeof zone === 'number' ? zone * 60 : zoneOffsetMinutes(zone, date.getTime());
  const sign = mins < 0 ? '-' : '+';
  const a = Math.abs(mins);
  return `UTC${sign}${String(Math.floor(a / 60)).padStart(2, '0')}:${String(a % 60).padStart(2, '0')}`;
}
