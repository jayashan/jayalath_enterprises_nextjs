import DashboardLayout from "../dashboard/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"








export default function AnalyticsPage() {
  return (
    <DashboardLayout>
         <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Website Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          
        </CardContent>
      </Card>
      </div>
    </DashboardLayout>
  )
}
