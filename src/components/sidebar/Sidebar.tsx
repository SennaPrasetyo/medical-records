import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Home, LogOut, User } from "lucide-react";
import "./sidebar.css";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/add-employee", label: "Add Employee", icon: User },
];

export function Sidebar() {
  return (
    <Box as="aside" aria-label="Sidebar navigation" className="sidebar">
      <Box className="sidebar-header">
        <Image
          src="/brify_logo.svg"
          alt="Brify by Magpie"
          width={160}
          height={46}
        />
      </Box>
      <Stack as="nav" className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "sidebar-link sidebar-link--active" : "sidebar-link"
              }
              end={item.to === "/"}
            >
              <Flex as="span" className="sidebar-link-icon">
                <Icon aria-hidden />
              </Flex>
              <Text as="span" className="sidebar-link-label">
                {item.label}
              </Text>
            </NavLink>
          );
        })}
      </Stack>
      <Box className="sidebar-footer">
        <NavLink to="/login" className="sidebar-link sidebar-link--danger">
          <Flex as="span" className="sidebar-link-icon">
            <LogOut aria-hidden />
          </Flex>
          <Text as="span" className="sidebar-link-label">
            Logout
          </Text>
        </NavLink>
      </Box>
    </Box>
  );
}
