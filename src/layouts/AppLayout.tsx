import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar/Sidebar.tsx";
import { Box, Flex } from "@chakra-ui/react";
import "./app-layout.css";

export function AppLayout() {
  return (
    <Flex className="app-shell">
      <Sidebar />
      <Box as="main" className="app-main">
        <Outlet />
      </Box>
    </Flex>
  );
}
