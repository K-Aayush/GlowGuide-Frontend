import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Users,
  UserPlus,
  ClipboardList,
  Calendar,
  Search,
  Clock,
  ArrowRight,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import dermotologistService from "../../api/services/dermotologistService";
import {
  DermatologistStats,
  Patient,
  DermatologistActivity,
} from "../../lib/types";

export default function DermatologistDashboard() {
  const { setIsLoading } = useContext(AppContext);
  const [stats, setStats] = useState<DermatologistStats | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activities, setActivities] = useState<DermatologistActivity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setIsLocalLoading(true);

      const [statsData, patientsData, activitiesData] = await Promise.all([
        dermotologistService.getStats(),
        dermotologistService.getPatients(),
        dermotologistService.getRecentActivity(),
      ]);

      setStats(statsData);
      setPatients(patientsData);
      setActivities(activitiesData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
      setIsLocalLoading(false);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "routine_created":
        return <ClipboardList className="w-4 h-4 text-green-500" />;
      case "assessment_completed":
        return <Users className="w-4 h-4 text-blue-500" />;
      case "progress_update":
        return <Calendar className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (isLocalLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <Users className="w-12 h-12 mb-4 text-primary animate-pulse" />
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold text-transparent md:text-3xl bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text">
          Dermatologist Dashboard
        </h1>
        <p className="text-foreground/70">
          Monitor patient progress and manage consultations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 ">
        <Card className="bg-blue-50">
          <CardContent className="flex items-center gap-4 p-6">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-foreground/70">Total Patients</p>
              <h3 className="text-2xl font-bold">
                {stats?.totalPatients || 0}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="flex items-center gap-4 p-6">
            <UserPlus className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-foreground/70">New This Month</p>
              <h3 className="text-2xl font-bold">
                {stats?.newPatientsThisMonth || 0}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Patients Table */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-transparent bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text">
              Recent Patients
            </CardTitle>
            <CardDescription>View and manage your patient list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="relative flex-grow">
                <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-foreground/50" />
                <Input
                  type="search"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Last Assessment</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.slice(0, 5).map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>
                        {patient.skinProfile?.lastAssessment
                          ? new Date(
                              patient.skinProfile.lastAssessment
                            ).toLocaleDateString()
                          : "No assessment"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="float-right"
                        >
                          <Link to={`/dermatologist/patients/${patient.id}`}>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/dermatologist/patients">View All Patients</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 ">
                  <Activity className="w-5 h-5 text-primary" />
                  <span className="text-transparent bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text">
                    Recent Activity
                  </span>
                </CardTitle>
                <CardDescription>
                  Latest updates from your patients
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.length === 0 ? (
                <div className="py-8 text-center text-foreground/70">
                  <Clock className="w-12 h-12 mx-auto mb-2 text-foreground/30" />
                  <p>No recent activity</p>
                </div>
              ) : (
                activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 transition-colors border rounded-lg hover:bg-muted/50"
                  >
                    <div className="p-2 rounded-full bg-muted">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.details}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground/70">
                          {activity.patient}
                        </span>
                        <span className="text-xs text-foreground/50">
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
