const truncate = (source, size) =>
  source.length > size ? source.slice(0, size - 1) + "…" : source;

export default truncate;
