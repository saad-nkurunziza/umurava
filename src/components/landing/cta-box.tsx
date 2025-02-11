export default function CTABox({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative overflow-hidden bg-primary py-8 rounded-2xl">
        {/* <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full transform translate-x-2/3 -translate-y-1/3" /> */}
        <div className="absolute -top-28 -right-16 w-48 h-48 border-[40px] border-background rounded-full " />
        {/* <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full transform -translate-x-3/4 translate-y-1/3" /> */}
        <div className="absolute -bottom-28 -left-16 w-48 h-48  border-[40px] border-background rounded-full " />
        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
}
