export default function assert(
  condition: boolean,
  error: any
): asserts condition {
  if (!condition) {
    throw error;
  }
}
