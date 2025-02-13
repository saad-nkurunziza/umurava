import {
  PrismaClient,
  UserRole,
  ChallengeLevel,
  ChallengeStatus,
  UserChallengeStatus,
  DeliverableStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Sample Data
const realUsers = [
  { name: "Kagabo Eric", email: "kagabo.eric@techcorp.com" },
  { name: "Uwase Marie", email: "uwase.marie@innovatedev.net" },
  { name: "Mugisha Jean", email: "mugisha.j@cloudarch.io" },
  { name: "Mutesi Alice", email: "mutesi.a@devstack.com" },
  { name: "Rukundo Paul", email: "rukundo.paul@codeforge.dev" },
  { name: "Gasana David", email: "gasana.david@techlead.io" },
  { name: "Ishimwe Grace", email: "ishimwe.g@devpro.net" },
  { name: "Ndayishimiye Frank", email: "ndayishimiye.f@cloudexp.com" },
  { name: "Umutoni Sarah", email: "umutoni.s@fullstack.dev" },
  { name: "Kamanzi Peter", email: "kamanzi.p@webcraft.io" },
  { name: "Uwimana Claire", email: "uwimana.c@devmaster.com" },
  { name: "Bizimana Alex", email: "bizimana.alex@techbuild.net" },
];

const techStacks = [
  {
    name: "Modern Web Stack",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"],
    requirements: [
      "Strong proficiency in React and TypeScript",
      "Experience with GraphQL API design",
      "Knowledge of PostgreSQL optimization",
      "Familiarity with CI/CD pipelines",
    ],
  },
  {
    name: "Mobile Development",
    skills: ["React Native", "TypeScript", "Firebase", "Redux", "Jest"],
    requirements: [
      "Experience building production mobile apps",
      "Deep understanding of state management",
      "Knowledge of mobile app deployment",
      "Experience with mobile testing frameworks",
    ],
  },
  {
    name: "Cloud Architecture",
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "Node.js"],
    requirements: [
      "AWS certification preferred",
      "Experience with infrastructure as code",
      "Knowledge of microservices architecture",
      "Understanding of cloud security best practices",
    ],
  },
];

const challengeTitles = [
  {
    title: "AI-Powered Content Recommendation Engine",
    description:
      "Build a sophisticated content recommendation system using machine learning algorithms to provide personalized suggestions based on user behavior and preferences.",
    brief:
      "Create an AI-driven recommendation engine that analyzes user interactions.",
    tasks: [
      "Implement user behavior tracking",
      "Develop ML model",
      "Create recommendation algorithm",
    ],
  },
  {
    title: "Sustainable Smart Home IoT Platform",
    description:
      "Create an IoT platform that helps users monitor and optimize their home energy consumption through smart device integration.",
    brief:
      "Design a scalable IoT platform that connects various smart home devices.",
    tasks: [
      "Device integration",
      "Real-time data processing",
      "Energy consumption dashboard",
    ],
  },
  {
    title: "Blockchain Supply Chain Tracker",
    description:
      "Develop a transparent supply chain tracking system using blockchain technology.",
    brief:
      "Build a decentralized application that tracks products from origin to delivery.",
    tasks: [
      "Smart contract development",
      "Product tracking system",
      "Supply chain dashboard",
    ],
  },
  {
    title: "Real-Time Collaboration Platform",
    description:
      "Build a collaborative workspace platform with real-time features.",
    brief: "Create a modern collaboration tool that combines key features.",
    tasks: ["Document sync", "Video conferencing", "Project management"],
  },
  {
    title: "Healthcare Analytics Platform",
    description:
      "Create a secure platform for healthcare providers to analyze patient data.",
    brief: "Develop a HIPAA-compliant analytics platform.",
    tasks: ["Secure storage", "Analytics models", "Visualization dashboard"],
  },
  {
    title: "E-Learning Management System",
    description:
      "Build a comprehensive learning platform with course management.",
    brief: "Create an educational platform with modern features.",
    tasks: [
      "Course creation",
      "Student progress tracking",
      "Assessment system",
    ],
  },
  {
    title: "Microservices Payment Gateway",
    description:
      "Develop a scalable payment processing system using microservices.",
    brief: "Build a secure and efficient payment gateway.",
    tasks: [
      "Payment processing",
      "Transaction monitoring",
      "Security implementation",
    ],
  },
  {
    title: "AI Chat Bot Platform",
    description:
      "Create an intelligent chatbot platform with NLP capabilities.",
    brief: "Develop a versatile chatbot system for business use.",
    tasks: ["NLP integration", "Conversation flow", "Analytics dashboard"],
  },
  {
    title: "Inventory Management System",
    description: "Build a real-time inventory tracking and management system.",
    brief: "Create an efficient inventory solution for businesses.",
    tasks: ["Stock tracking", "Order management", "Reporting system"],
  },
  {
    title: "Social Media Analytics Tool",
    description: "Develop a platform for analyzing social media metrics.",
    brief: "Build a comprehensive social media monitoring solution.",
    tasks: ["Data collection", "Metric analysis", "Report generation"],
  },
  {
    title: "Cloud-Native CMS",
    description:
      "Create a modern content management system using cloud technologies.",
    brief: "Build a scalable and flexible CMS platform.",
    tasks: ["Content modeling", "API development", "Admin interface"],
  },
  {
    title: "DevOps Pipeline Automation",
    description: "Develop an automated CI/CD pipeline system.",
    brief: "Create a robust DevOps automation solution.",
    tasks: ["Pipeline setup", "Testing automation", "Deployment scripts"],
  },
  {
    title: "Virtual Event Platform",
    description: "Build a platform for hosting virtual events and conferences.",
    brief: "Create an engaging virtual event solution.",
    tasks: ["Live streaming", "Interactive features", "Event management"],
  },
  {
    title: "HR Management System",
    description: "Develop a comprehensive HR management platform.",
    brief: "Build an efficient HR solution for modern businesses.",
    tasks: ["Employee records", "Leave management", "Performance tracking"],
  },
  {
    title: "Restaurant Management Platform",
    description: "Create a complete restaurant management system.",
    brief: "Build a solution for restaurant operations.",
    tasks: ["Order processing", "Inventory tracking", "Staff management"],
  },
  {
    title: "Real Estate Marketplace",
    description: "Develop a modern real estate listing and search platform.",
    brief: "Create a comprehensive property marketplace.",
    tasks: ["Property listings", "Search system", "User management"],
  },
  {
    title: "Fleet Management System",
    description: "Build a system for tracking and managing vehicle fleets.",
    brief: "Create an efficient fleet monitoring solution.",
    tasks: ["Vehicle tracking", "Maintenance scheduling", "Route optimization"],
  },
  {
    title: "Project Management Tool",
    description: "Develop a comprehensive project management platform.",
    brief: "Build a modern project tracking solution.",
    tasks: ["Task management", "Team collaboration", "Progress tracking"],
  },
  {
    title: "Customer Support Platform",
    description: "Create a customer service and support management system.",
    brief: "Build an efficient customer support solution.",
    tasks: ["Ticket management", "Customer tracking", "Support analytics"],
  },
  {
    title: "Digital Asset Management",
    description: "Develop a system for managing digital assets and media.",
    brief: "Create a comprehensive asset management platform.",
    tasks: ["Asset organization", "Search functionality", "Version control"],
  },
  {
    title: "Appointment Scheduling System",
    description: "Build a flexible appointment booking platform.",
    brief: "Create an efficient scheduling solution.",
    tasks: ["Calendar management", "Notification system", "User scheduling"],
  },
  {
    title: "Event Ticketing Platform",
    description: "Develop a complete event ticketing system.",
    brief: "Build a modern event management solution.",
    tasks: ["Ticket sales", "Event management", "Payment processing"],
  },
  {
    title: "Subscription Management System",
    description: "Create a platform for managing subscription services.",
    brief: "Build a comprehensive subscription handling solution.",
    tasks: ["Billing system", "User management", "Analytics dashboard"],
  },
  {
    title: "Task Automation Platform",
    description: "Develop a system for automating repetitive tasks.",
    brief: "Create an efficient automation solution.",
    tasks: ["Workflow creation", "Integration tools", "Task monitoring"],
  },
  {
    title: "API Gateway Service",
    description: "Build a robust API gateway and management system.",
    brief: "Create a secure API handling solution.",
    tasks: ["Route management", "Security implementation", "Usage monitoring"],
  },
  {
    title: "Document Management System",
    description: "Develop a secure document storage and sharing platform.",
    brief: "Build an efficient document handling solution.",
    tasks: ["File management", "Access control", "Version tracking"],
  },
  {
    title: "Time Tracking Platform",
    description: "Create a comprehensive time tracking and reporting system.",
    brief: "Build an efficient time management solution.",
    tasks: ["Time logging", "Report generation", "Project tracking"],
  },
  {
    title: "Survey Management System",
    description: "Develop a platform for creating and managing surveys.",
    brief: "Create a flexible survey handling solution.",
    tasks: ["Survey creation", "Response collection", "Data analysis"],
  },
  {
    title: "Bug Tracking System",
    description: "Build a comprehensive issue and bug tracking platform.",
    brief: "Create an efficient bug management solution.",
    tasks: ["Issue tracking", "Team collaboration", "Status monitoring"],
  },
  {
    title: "Content Delivery Platform",
    description: "Develop a scalable content delivery and distribution system.",
    brief: "Build an efficient content serving solution.",
    tasks: [
      "Content distribution",
      "Cache management",
      "Performance monitoring",
    ],
  },
];

async function main() {
  console.log("🌱 Starting database seeding...");

  await prisma.$transaction([
    prisma.deliverable.deleteMany(),
    prisma.userChallenge.deleteMany(),
    prisma.challenge.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const users = await Promise.all(
    realUsers.map(async (userData) => {
      return prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          emailVerified: new Date(),
          role: userData === realUsers[0] ? UserRole.ADMIN : UserRole.USER,
          image: `https://api.dicebear.com/7.x/avatars/svg?seed=${userData.name}`,
        },
      });
    })
  );

  const challenges = await Promise.all(
    challengeTitles.map(async (challengeData) => {
      const stack = getRandomElement(techStacks);
      const startDate = generateRandomDate(
        new Date(2024, 0, 1),
        new Date(2024, 11, 31)
      );
      const endDate = new Date(startDate);
      endDate.setDate(
        startDate.getDate() + Math.floor(Math.random() * 60) + 30
      );

      return prisma.challenge.create({
        data: {
          title: challengeData.title,
          projectDescription: challengeData.description,
          projectBrief: `We're seeking talented developers to build an innovative solution using ${stack.skills.join(
            ", "
          )}.`,
          projectTasks: [
            "System Architecture & Planning",
            "Core Feature Implementation",
            "Testing & Quality Assurance",
            "Documentation & Deployment",
          ],
          requirements: stack.requirements,
          skills: stack.skills,
          level: getRandomElement([
            ChallengeLevel.Junior,
            ChallengeLevel.Intermediate,
            ChallengeLevel.Senior,
          ]),
          prize: Math.floor(Math.random() * 15000) + 5000,
          status: getRandomElement([
            ChallengeStatus.Open,
            ChallengeStatus.Closed,
            ChallengeStatus.Postponed,
            ChallengeStatus.Canceled,
          ]),
          maxParticipants: Math.floor(Math.random() * 5) + 5,
          startDate,
          endDate,
        },
      });
    })
  );

  for (const user of users) {
    const userChallenges = challenges
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 2);

    for (const challenge of userChallenges) {
      const status = getRandomElement([
        UserChallengeStatus.Open,
        UserChallengeStatus.Ongoing,
        UserChallengeStatus.Completed,
      ]);

      await prisma.userChallenge.create({
        data: {
          userId: user.id,
          challengeId: challenge.id,
          status,
        },
      });

      if (status === UserChallengeStatus.Completed) {
        await prisma.deliverable.create({
          data: {
            userId: user.id,
            challengeId: challenge.id,
            codebase_link: `https://github.com/${(user.name ?? "user")
              .toLowerCase()
              .replace(" ", "-")}/${challenge.title
              .toLowerCase()
              .replace(/ /g, "-")}`,
            more_info: `Complete solution implemented using ${challenge.skills.join(
              ", "
            )}. Includes comprehensive testing, documentation, and deployment configuration.`,
            status: getRandomElement([
              DeliverableStatus.Submitted,
              DeliverableStatus.Accepted,
              DeliverableStatus.Rejected,
              DeliverableStatus.NeedsRevision,
            ]),
          },
        });
      }
    }
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
