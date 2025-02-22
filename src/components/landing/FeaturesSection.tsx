import { Sparkles, Shield, Clock, Users } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Analysis',
    description: 'Get personalized skincare recommendations based on your unique skin profile',
  },
  {
    icon: Shield,
    title: 'Expert Guidance',
    description: 'Access professional advice from certified dermatologists',
  },
  {
    icon: Clock,
    title: 'Progress Tracking',
    description: "Monitor your skin's improvement over time with detailed analytics",
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connect with others on their skincare journey',
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Everything you need to achieve your best skin ever
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}