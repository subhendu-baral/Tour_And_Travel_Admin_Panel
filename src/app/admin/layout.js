import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/ui/header";
import { ThemeProvider } from "@/components/theme-provider";
import UserProvider from "@/hooks/UserProvider";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({ children }) {
  return (
    <UserProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar className="mt-[60px]" />
          <Header />
          <div className="mt-[60px] px-4 pt-6 w-full">{children}</div>
          <Toaster />
        </SidebarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
