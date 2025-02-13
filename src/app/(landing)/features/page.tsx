import React from "react";
import SectionTitle from "@/components/landing/section-title";
import {
  BarChart2,
  CheckSquare,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";

const FeaturesPage = () => {
  const features = [
    {
      title: "Challenge-Based Learning",
      description:
        "Engage in real-world challenges designed to build practical, market-ready skills.",
      icon: <Target className="w-8 h-8" />,
    },
    {
      title: "Interactive Tasks",
      description:
        "Complete structured tasks that progressively enhance your abilities and knowledge.",
      icon: <CheckSquare className="w-8 h-8" />,
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed progress tracking and achievement metrics.",
      icon: <BarChart2 className="w-8 h-8" />,
    },
    {
      title: "Reward System",
      description:
        "Earn rewards and prizes as you complete challenges and demonstrate your skills.",
      icon: <Trophy className="w-8 h-8" />,
    },
    {
      title: "Real-time Updates",
      description:
        "Stay informed with instant updates on your challenge progress and achievements.",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Performance Evaluation",
      description:
        "Receive comprehensive feedback and evaluation on your completed tasks.",
      icon: <TrendingUp className="w-8 h-8" />,
    },
  ];

  return (
    <main>
      <section>
        <SectionTitle
          title="Platform Features"
          subtitle="Discover the powerful features that make Umurava your ideal platform for skill development"
        />

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h5 className="sm:text-xl font-semibold mb-2">{feature.title}</h5>
              <p className="text-sm sm:text-base text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FeaturesPage;
