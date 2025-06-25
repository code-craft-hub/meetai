type Props = {
  children: React.ReactNode;
};

const CallLayout = ({ children }: Props) => {
  return <div className="h-screen bg-background">{children}</div>;
};

export default CallLayout;
