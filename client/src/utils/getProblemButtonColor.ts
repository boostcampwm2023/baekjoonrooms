export function getProblemButtonColor(level: number | undefined): string {
  if (level === undefined) {
    return `text-text_default bg-text_default/20`;
  }
  if (level === 0) {
    return `text-text_default bg-text_default/20`;
  }
  if (level <= 5) {
    return `text-level_bronze bg-level_bronze/20`;
  }
  if (level <= 10) {
    return `text-level_silver bg-level_silver/20`;
  }
  if (level <= 15) {
    return `text-level_gold bg-level_gold/20`;
  }
  if (level <= 20) {
    return `text-level_platinum bg-level_platinum/20`;
  }
  if (level <= 25) {
    return `text-level_diamond bg-level_diamond/20`;
  }
  if (level <= 30) {
    return `text-level_ruby bg-level_ruby/20`;
  }
  return `text-text_default bg-text_default/20`;
}
