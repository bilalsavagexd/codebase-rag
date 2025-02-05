'use client'
import  Link  from "next/link"
import { cn } from "@/lib/utils"
import useProject from "@/hooks/use-project"
import {usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { LayoutDashboard, Bot, Presentation, CreditCard, Plus} from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,  
    },
    {
        title: "Q&A",
        url: "/qa",
        icon: Bot,  
    },
    {
        title: "Meetings",
        url: "/meetings",
        icon: Presentation,  
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard,  
    }
]

export function AppSidebar() {
    const pathname = usePathname()
    const { open } = useSidebar()
    const { projects, projectId, setProjectId } = useProject()
    return (
        <Sidebar collapsible="icon" variant = "floating">
            <SidebarHeader>
                <div className='flex items-center gap-2'>
                    {/* <Image src ='/logo.png' alt ='logo' width={40} height={40} /> */}
                    
                    {/* rendering the title only when the sidebar is open */}
                    {open && (
                        <h1 className = "text-xl font-bold text-rpimary/80">
                        GitRAG
                        </h1>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(item => {
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url} className= {cn({
                                                '!bg-primary !text-white' : pathname === item.url
                                            }, 'list-none')}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Your Projects
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projects?.map(project => {
                                    return (
                                        <SidebarMenuItem key={project.name}>
                                            <SidebarMenuButton asChild>
                                                <div onClick={() => {
                                                    setProjectId(project.id)
                                                }}>
                                                    <div className= {cn(
                                                        'rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary',
                                                        {
                                                            'bg-primary text-white' : project.id === projectId
                                                        }
                                                    )}>
                                                        {project.name[0]}
                                                    </div>
                                                    <span>{project.name}</span>
                                                </div>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                                <div className = "h-2"></div>
                                
                                {open && (
                                    <SidebarMenuItem>
                                        <Link href='/create'>
                                            <Button  size='sm' variant = {"outline"} className = "w-fit">
                                                <Plus />
                                                Create Project
                                            </Button>
                                        </Link>
                                    </SidebarMenuItem>
                                )}
                                
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}