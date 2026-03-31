import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, LifeBuoy } from "lucide-react";

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/homme01.png" alt="@user" />
            <AvatarFallback>CNF</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]" side="right" align="end" sideOffset={15} forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col items-center justify-center p-2">
            <Avatar className="h-16 w-16 mb-4">
              <AvatarImage src="/homme01.png" alt="@user" />
              <AvatarFallback>CNF</AvatarFallback>
            </Avatar>
            <p className="text-base font-semibold mb-1 text-black">
              Agent CNF
            </p>
            <p className="text-sm leading-none text-muted-foreground">
              agent@cnf.ci
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profil
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            Support
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
