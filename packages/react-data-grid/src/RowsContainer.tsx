export interface RowsContainerProps {
  id: string;
  children: React.ReactNode;
}

export default function RowsContainer({ children }: RowsContainerProps) {
  return children;
}
