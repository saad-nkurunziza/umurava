import CTABox from "@/components/landing/cta-box";
const statsData = [
  { value: "1", label: "year" },
  { value: "10K+", label: "users" },
  { value: "500+", label: "Challenges Completed" },
  { value: "6+", label: "Countries" },
];

export const Stats = () => {
  return (
    <CTABox>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-4 text-primary-foreground">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="mx-auto flex max-w-xs flex-col gap-y-2 sm:gap-y-4"
            >
              <dt className="text-sm sm:text-base/7 text-primary-foreground/80">
                {stat.label}
              </dt>
              <dd className="order-first text-lg sm:text-3xl font-semibold tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </CTABox>
  );
};
