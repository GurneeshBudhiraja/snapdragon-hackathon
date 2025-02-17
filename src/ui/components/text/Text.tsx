function Text({
  textContent,
  className,
}: {
  textContent: string;
  className?: string;
}) {
  return <div className={className}>{textContent}</div>;
}

export default Text;
