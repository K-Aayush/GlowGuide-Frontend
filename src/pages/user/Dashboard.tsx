import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Calendar, Camera, ChevronRight, Search, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  RoutineData,
  ProgressLogData,
  SkinProfileData,
  SkinConcernObject,
} from "../../lib/types";
import skinProfileService from "../../api/services/skinService";
import routineService from "../../api/services/routineService";
import progressService from "../../api/services/progressService";
import { toast } from "sonner";

export default function Dashboard() {
  const { userData, setIsLoading, setSkinProfile } = useContext(AppContext);
  const [routines, setRoutines] = useState<RoutineData[]>([]);
  const [recentLogs, setRecentLogs] = useState<ProgressLogData[]>([]);
  const [userProfile, setUserProfile] = useState<SkinProfileData | null>(null);
  const [isLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setLocalLoading(true);

        // Fetch skin profile
        try {
          const profileData = await skinProfileService.getSkinProfile();
          setUserProfile(profileData);
          setSkinProfile(profileData);
        } catch (error) {
          console.error("Error fetching skin profile:", error);
          // Profile might not exist yet, which is okay
        }

        // Fetch routines
        try {
          const routinesData = await routineService.getRoutines();
          setRoutines(routinesData);
        } catch (error) {
          console.error("Error fetching routines:", error);
          toast.error("Failed to load your routines");
        }

        // Fetch progress logs
        try {
          const logsData = await progressService.getLogs();
          setRecentLogs(logsData.slice(0, 3)); // Get most recent 3 logs
        } catch (error) {
          console.error("Error fetching progress logs:", error);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
        setLocalLoading(false);
      }
    };

    fetchDashboardData();
  }, [setIsLoading, setSkinProfile]);

  // Format concerns for display
  const formatConcerns = (concerns: SkinConcernObject[]) => {
    if (!Array.isArray(concerns)) return "No concerns listed";
    return concerns
      .map((concern) =>
        concern.concern
          .toLowerCase()
          .split("_")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      )
      .join(", ");
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Sparkles className="w-12 h-12 mb-4 text-primary animate-pulse" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">
          Welcome, {userData?.name}!
        </h1>
        <p className="text-foreground/70">
          {!userProfile
            ? "Complete your skin assessment to get personalized recommendations."
            : "Here's your skin journey overview."}
        </p>
      </div>

      {/* Assessment Banner (shown if no profile exists) */}
      {!userProfile && (
        <Card className="mb-8 bg-gradient-to-r from-primary/20 to-pink-100">
          <CardContent className="flex flex-col items-center gap-4 py-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="mb-2 text-xl font-semibold">
                Start Your Skin Journey
              </h2>
              <p className="text-foreground/70">
                Complete your skin assessment to receive personalized routines
                and product recommendations.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link to="/user/skin-assessment">
                Take Assessment
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Skin Profile Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-primary" />
              Skin Profile
            </CardTitle>
            <CardDescription>Your skin type and concerns</CardDescription>
          </CardHeader>
          <CardContent>
            {userProfile ? (
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Skin Type</p>
                  <p className="text-sm text-foreground/70">
                    {userProfile.SkinType && userProfile.SkinType.length > 0
                      ? userProfile.SkinType.map((skin, index) => (
                          <span key={index}>
                            {skin.type}
                            {index < userProfile.SkinType.length - 1 && ", "}
                          </span>
                        ))
                      : "No skin type available"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Top Concern</p>
                  <p className="text-sm text-foreground/70">
                    {userProfile.Concerns
                      ? formatConcerns(userProfile.Concerns)
                      : "No concerns listed"}
                  </p>
                </div>
                {userProfile.goals && (
                  <div>
                    <p className="text-sm font-medium">Goals</p>
                    <p className="text-foreground/70">{userProfile.goals}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-4 text-center text-foreground/70">
                <p>No skin profile found</p>
                <p className="text-sm">
                  Take the assessment to create your profile
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link
                to={
                  userProfile
                    ? "/user/skin-assessment"
                    : "/user/skin-assessment"
                }
              >
                {userProfile ? "Update Profile" : "Create Profile"}
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Routines Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              My Routines
            </CardTitle>
            <CardDescription>Your daily skincare regimens</CardDescription>
          </CardHeader>
          <CardContent>
            {routines && routines.length > 0 ? (
              <div className="space-y-3">
                {routines.slice(0, 3).map((routine) => (
                  <Link
                    key={routine.id}
                    to={`/user/routines/${routine.id}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                  >
                    <div>
                      <p className="font-medium">{routine.name}</p>
                      <p className="text-sm text-foreground/70">
                        {routine.type}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground/50" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-foreground/70">
                <p>No routines found</p>
                <p className="text-sm">
                  {userProfile
                    ? "Create a routine to get started"
                    : "Complete your skin assessment first"}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/user/routines">
                {routines && routines.length > 0
                  ? "View All Routines"
                  : "Create Routine"}
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Camera className="w-5 h-5 mr-2 text-primary" />
              Skin Progress
            </CardTitle>
            <CardDescription>Track your skincare journey</CardDescription>
          </CardHeader>
          <CardContent>
            {recentLogs && recentLogs.length > 0 ? (
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                  >
                    <div>
                      <p className="font-medium">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-foreground/70">
                        Concern:{" "}
                        {log.concerns
                          .toString()
                          .replace("_", " ")
                          .toLowerCase()}
                      </p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: log.rating }).map((_, i) => (
                        <Sparkles key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-foreground/70">
                <p>No progress logs found</p>
                <p className="text-sm">
                  Record your first entry to start tracking
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/user/progress">
                {recentLogs && recentLogs.length > 0
                  ? "View Progress"
                  : "Add First Log"}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recommendation Section */}
      {userProfile && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>
              Based on your skin profile and goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                to="/user/products"
                className="overflow-hidden transition-all border rounded-lg group hover:shadow-md"
              >
                <div className="aspect-square bg-muted">
                  <img
                    src="https://images.pexels.com/photos/5069618/pexels-photo-5069618.jpeg"
                    alt="Product recommendation"
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="font-medium">Explore Products</p>
                  <p className="text-sm text-foreground/70">
                    Find products suited for your skin type
                  </p>
                </div>
              </Link>

              <Link
                to="/user/routines"
                className="overflow-hidden transition-all border rounded-lg group hover:shadow-md"
              >
                <div className="aspect-square bg-muted">
                  <img
                    src="https://images.pexels.com/photos/3765174/pexels-photo-3765174.jpeg"
                    alt="Skincare routine"
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="font-medium">Build Your Routine</p>
                  <p className="text-sm text-foreground/70">
                    Personalized step-by-step regimens
                  </p>
                </div>
              </Link>

              <Link
                to="/user/progress"
                className="overflow-hidden transition-all border rounded-lg group hover:shadow-md"
              >
                <div className="aspect-square bg-muted">
                  <img
                    src="https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg"
                    alt="Progress tracking"
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="font-medium">Track Progress</p>
                  <p className="text-sm text-foreground/70">
                    Document your skincare journey
                  </p>
                </div>
              </Link>

              <Link
                to="/skincare-101"
                className="overflow-hidden transition-all border rounded-lg group hover:shadow-md"
              >
                <div className="aspect-square bg-muted">
                  <img
                    src="https://images.pexels.com/photos/3785148/pexels-photo-3785148.jpeg"
                    alt="Skincare education"
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="font-medium">Skincare 101</p>
                  <p className="text-sm text-foreground/70">
                    Learn about ingredients and techniques
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
