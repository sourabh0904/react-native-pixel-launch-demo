import React, { createContext, useContext, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height: SCREEN_H } = Dimensions.get("window");
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  PixelLaunchContainer,
  PixelDialog,
  AnimatedBottomSheet,
  StaggerItem,
  DomeFooter,
  FabMenu,
  PixelMenuOverlay,
  FOOTER_BAR_H,
  DOME_CX,
  BTN_R,
  type LaunchOrigin,
  type PixelMenuItem,
} from "react-native-pixel-launch";
import { DashboardIcon } from "./components/DashboardIcon";
import { DetailScreenContent } from "./components/DetailScreenContent";
import { APPS, type AppItem } from "./data/apps";

// ─── Theme ───────────────────────────────────────────────────────────────────

type Theme = {
  mode: "dark" | "light";
  bg: string;
  card: string;
  text: string;
  subText: string;
  muted: string;
  border: string;
  profileBg: string;
  profileBorder: string;
  statusBar: "light-content" | "dark-content";
};

const DARK: Theme = {
  mode: "dark",
  bg: "#0F0F1A",
  card: "#1E1E30",
  text: "#FFFFFF",
  subText: "#718096",
  muted: "#4A5568",
  border: "#2D2D45",
  profileBg: "#1E1E30",
  profileBorder: "#2D2D45",
  statusBar: "light-content",
};

const LIGHT: Theme = {
  mode: "light",
  bg: "#F7F8FA",
  card: "#FFFFFF",
  text: "#1A202C",
  subText: "#718096",
  muted: "#A0AEC0",
  border: "#E2E8F0",
  profileBg: "#FFFFFF",
  profileBorder: "#E2E8F0",
  statusBar: "dark-content",
};

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: DARK,
  toggle: () => {},
});

const useTheme = () => useContext(ThemeContext);

// ─── Main ────────────────────────────────────────────────────────────────────

function Main() {
  const insets = useSafeAreaInsets();
  const barH   = FOOTER_BAR_H + insets.bottom;
  const { theme, toggle } = useTheme();

  // ── PixelLaunchContainer state ──
  const [activeApp, setActiveApp] = useState<AppItem | null>(null);
  const [origin, setOrigin]       = useState<LaunchOrigin | null>(null);
  const [visible, setVisible]     = useState(false);

  // ── PixelDialog state ──
  const [dialogVisible, setDialogVisible]     = useState(false);
  const [dialogOrigin, setDialogOrigin]       = useState<LaunchOrigin | null>(null);
  const dialogBtnRef = useRef<View>(null);

  // ── AnimatedBottomSheet state ──
  const [sheetVisible, setSheetVisible] = useState(false);

  // ── PixelMenuOverlay state ──
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuOrigin, setMenuOrigin]   = useState<LaunchOrigin | null>(null);

  // ── Menu item pressed inside overlay ──
  const [menuItemApp, setMenuItemApp]       = useState<PixelMenuItem | null>(null);
  const [menuItemOrigin, setMenuItemOrigin] = useState<LaunchOrigin | null>(null);
  const [menuItemVisible, setMenuItemVisible] = useState(false);

  // ── DomeFooter + FabMenu state ──
  const [fabOpen, setFabOpen] = useState(false);

  // ── Handlers ──
  const handleOpen = (app: AppItem, launchOrigin: LaunchOrigin) => {
    setActiveApp(app);
    setOrigin(launchOrigin);
    setVisible(true);
  };

  const handleClose = () => setVisible(false);
  const handleDismissed = () => setActiveApp(null);

  const handleDialogOpen = () => {
    dialogBtnRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setDialogOrigin({ x: pageX, y: pageY, width, height });
      setDialogVisible(true);
    });
  };

  const handleMenuOpen = () => {
    // Origin at the FAB button position (bottom-right dome area)
    const fabX = DOME_CX - BTN_R;
    const fabY = SCREEN_H - barH - BTN_R;
    setMenuOrigin({ x: fabX, y: fabY, width: BTN_R * 2, height: BTN_R * 2 });
    setMenuVisible(true);
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.bg} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: barH + BTN_R + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.greeting, { color: theme.text }]}>Good Morning 👋</Text>
              <Text style={[styles.subGreeting, { color: theme.subText }]}>What would you like to open?</Text>
            </View>
            <TouchableOpacity
              onPress={toggle}
              activeOpacity={0.8}
              style={[styles.profileCircle, { backgroundColor: theme.profileBg, borderColor: theme.profileBorder }]}
            >
              <Text style={{ fontSize: 22 }}>{theme.mode === "dark" ? "🌙" : "☀️"}</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Info Bar */}
          <View style={[styles.infoBar, { backgroundColor: theme.card }]}>
            {[
              { label: "Menus", value: "9" },
              { label: "Alerts", value: "3" },
              { label: "Orders", value: "12" },
            ].map((item) => (
              <View key={item.label} style={styles.infoItem}>
                <Text style={[styles.infoValue, { color: theme.text }]}>{item.value}</Text>
                <Text style={[styles.infoLabel, { color: theme.subText }]}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* ── Demo Buttons for new components ─────────────────────── */}
          <Text style={[styles.gridLabel, { color: theme.subText }]}>New Components Demo</Text>
          <View style={styles.demoRow}>
            <TouchableOpacity
              ref={dialogBtnRef as any}
              style={[styles.demoBtn, { backgroundColor: "#6C63FF" }]}
              onPress={handleDialogOpen}
              activeOpacity={0.85}
            >
              <Text style={styles.demoBtnIcon}>💬</Text>
              <Text style={styles.demoBtnText}>Pixel Dialog</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.demoBtn, { backgroundColor: "#00C9A7" }]}
              onPress={() => setSheetVisible(true)}
              activeOpacity={0.85}
            >
              <Text style={styles.demoBtnIcon}>📋</Text>
              <Text style={styles.demoBtnText}>Bottom Sheet</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Grid Label */}
          <Text style={[styles.gridLabel, { color: theme.subText }]}>All Menus</Text>

          {/* Icon Grid */}
          <View style={styles.grid}>
            {APPS.map((app) => (
              <DashboardIcon
                key={app.id}
                app={app}
                onPress={(o) => handleOpen(app, o)}
              />
            ))}
          </View>

          {/* Recent Section */}
          <Text style={[styles.gridLabel, { color: theme.subText }]}>Recent Activity</Text>
          <View style={[styles.activityCard, { backgroundColor: theme.card }]}>
            {[
              { icon: "📦", text: "Order #4822 received", time: "2m ago", color: "#00C9A7" },
              { icon: "💳", text: "Payment $245 confirmed", time: "18m ago", color: "#38A169" },
              { icon: "⚠️", text: "Low stock alert — Blue Widget", time: "1h ago", color: "#DD6B20" },
            ].map((item, idx) => (
              <View key={item.text} style={[styles.activityRow, { borderBottomColor: theme.border }, idx === 2 && { borderBottomWidth: 0 }]}>
                <View style={[styles.activityDot, { backgroundColor: item.color }]}>
                  <Text style={{ fontSize: 14 }}>{item.icon}</Text>
                </View>
                <Text style={[styles.activityText, { color: theme.mode === "dark" ? "#CBD5E0" : "#4A5568" }]} numberOfLines={1}>{item.text}</Text>
                <Text style={[styles.activityTime, { color: theme.muted }]}>{item.time}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* ── Pixel Launch Overlay ────────────────────────────────────── */}
      <PixelLaunchContainer
        visible={visible}
        origin={origin}
        onClose={handleClose}
        onDismissed={handleDismissed}
        backgroundColor={activeApp?.color ?? "#FFFFFF"}
      >
        {activeApp && (
          <DetailScreenContent app={activeApp} onClose={handleClose} />
        )}
      </PixelLaunchContainer>

      {/* ── Pixel Dialog ────────────────────────────────────────────── */}
      <PixelDialog
        visible={dialogVisible}
        origin={dialogOrigin}
        title="Delete this item?"
        message="This action cannot be undone. All associated data will be permanently removed."
        icon={
          <View style={{ width: 56, height: 56, borderRadius: 18, backgroundColor: "#FEE2E2", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 26 }}>🗑️</Text>
          </View>
        }
        buttons={[
          { label: "Cancel", style: "cancel", onPress: () => setDialogVisible(false) },
          { label: "Delete", style: "destructive", onPress: () => setDialogVisible(false) },
        ]}
        onDismiss={() => setDialogVisible(false)}
      />

      {/* ── Animated Bottom Sheet ───────────────────────────────────── */}
      <AnimatedBottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        title="Quick Actions"
        bottomOffset={barH + BTN_R}
        originX={DOME_CX}
        backgroundColor={theme.mode === "dark" ? "#1E1E30" : "#FFFFFF"}
        titleColor={theme.text}
        handleColor={theme.mode === "dark" ? "#4A5568" : "#E5E7EB"}
        dividerColor={theme.border}
      >
        {[
          { icon: "📦", label: "New Order", desc: "Create a new order" },
          { icon: "👤", label: "Add Customer", desc: "Register a new customer" },
          { icon: "📊", label: "View Reports", desc: "Check analytics dashboard" },
          { icon: "🔔", label: "Notifications", desc: "See recent alerts" },
          { icon: "⚙️", label: "Settings", desc: "Configure app preferences" },
        ].map((item, i) => (
          <StaggerItem key={item.label} index={i}>
            <TouchableOpacity
              style={[styles.sheetRow, { borderBottomColor: theme.border }]}
              activeOpacity={0.7}
              onPress={() => setSheetVisible(false)}
            >
              <View style={[styles.sheetIcon, { backgroundColor: theme.mode === "dark" ? "#2D2D45" : "#F7FAFC" }]}>
                <Text style={{ fontSize: 22 }}>{item.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.sheetLabel, { color: theme.text }]}>{item.label}</Text>
                <Text style={[styles.sheetDesc, { color: theme.subText }]}>{item.desc}</Text>
              </View>
              <Text style={{ color: theme.muted, fontSize: 16 }}>›</Text>
            </TouchableOpacity>
          </StaggerItem>
        ))}
      </AnimatedBottomSheet>
      {/* ── Menu Grid Overlay (inside PixelLaunchContainer) ──────── */}
      <PixelLaunchContainer
        visible={menuVisible}
        origin={menuOrigin}
        onClose={() => setMenuVisible(false)}
        onDismissed={() => {}}
        backgroundColor={theme.mode === "dark" ? "#0F0F1A" : "#F7F8FA"}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Close header */}
          <View style={styles.menuHeader}>
            <Text style={[styles.menuHeaderTitle, { color: theme.text }]}>All Menus</Text>
            <TouchableOpacity onPress={() => setMenuVisible(false)} activeOpacity={0.7}>
              <Text style={{ fontSize: 28, color: theme.subText }}>✕</Text>
            </TouchableOpacity>
          </View>

          <PixelMenuOverlay
            items={MENU_ITEMS}
            primaryColor="#6C63FF"
            iconCircleColor={theme.mode === "dark" ? "#1E1E30" : "#FFFFFF"}
            labelColor={theme.mode === "dark" ? "#CBD5E0" : "#1F2937"}
            searchBackgroundColor={theme.mode === "dark" ? "#1E1E30" : "#FFFFFF"}
            searchTextColor={theme.text}
            searchPlaceholderColor={theme.muted}
            searchShadowColor="#6C63FF"
            bottomPadding={barH + BTN_R + 20}
            renderIcon={(item, color, size) => (
              <Text style={{ fontSize: size - 4 }}>{(item as any).icon}</Text>
            )}
            onItemPress={(item, origin) => {
              setMenuItemApp(item);
              setMenuItemOrigin(origin);
              setMenuItemVisible(true);
            }}
          />
        </SafeAreaView>
      </PixelLaunchContainer>

      {/* ── Menu Item Detail (pixel launch from grid card) ──────── */}
      <PixelLaunchContainer
        visible={menuItemVisible}
        origin={menuItemOrigin}
        onClose={() => setMenuItemVisible(false)}
        onDismissed={() => setMenuItemApp(null)}
        backgroundColor={menuItemApp?.color ?? "#FFFFFF"}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[styles.menuDetailHeader, { backgroundColor: menuItemApp?.color ?? "#6C63FF" }]}>
            <TouchableOpacity onPress={() => setMenuItemVisible(false)} style={styles.menuDetailBack}>
              <Text style={{ fontSize: 30, color: "#FFF", lineHeight: 34 }}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.menuDetailTitle}>{menuItemApp?.title ?? ""}</Text>
            <View style={{ width: 40 }} />
          </View>
          <View style={{ flex: 1, backgroundColor: "#FFF", alignItems: "center", justifyContent: "center", paddingBottom: barH + BTN_R }}>
            <Text style={{ fontSize: 48 }}>{(menuItemApp as any)?.icon}</Text>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#1A202C", marginTop: 12 }}>{menuItemApp?.title}</Text>
            <Text style={{ fontSize: 14, color: "#718096", marginTop: 4 }}>{menuItemApp?.category}</Text>
          </View>
        </SafeAreaView>
      </PixelLaunchContainer>

      {/* ── FAB Menu (above all overlays) ───────────────────────────── */}
      <FabMenu
        isOpen={fabOpen}
        bottomOffset={barH}
        primaryColor="#6C63FF"
        items={[
          {
            key: "menu",
            icon: <Text style={{ color: "#FFF", fontSize: 18 }}>🗂️</Text>,
            label: "Menu Items",
            onPress: () => { setFabOpen(false); setTimeout(handleMenuOpen, 150); },
          },
          {
            key: "sheet",
            icon: <Text style={{ color: "#FFF", fontSize: 18 }}>📋</Text>,
            label: "Bottom Sheet",
            onPress: () => { setFabOpen(false); setTimeout(() => setSheetVisible(true), 200); },
          },
          {
            key: "dialog",
            icon: <Text style={{ color: "#FFF", fontSize: 18 }}>💬</Text>,
            label: "Pixel Dialog",
            onPress: () => { setFabOpen(false); setTimeout(handleDialogOpen, 200); },
          },
        ]}
        onClose={() => setFabOpen(false)}
      />

      {/* ── Dome Footer (always on top, permanent) ──────────────────── */}
      <DomeFooter
        barH={barH}
        primaryColor="#6C63FF"
        footerColor={theme.mode === "dark" ? "#1E1E30" : "#FFFFFF"}
        brandText="Pixel Launch Demo"
        isFabOpen={fabOpen}
        isSheetOpen={sheetVisible}
        isMenuOpen={menuVisible || visible || menuItemVisible}
        onToggleFab={() => setFabOpen(!fabOpen)}
        onCloseSheet={() => setSheetVisible(false)}
        onCloseMenu={() => {
          if (menuItemVisible) setMenuItemVisible(false);
          else if (visible) setVisible(false);
          else if (menuVisible) setMenuVisible(false);
        }}
        renderIcon={(name) => (
          <Text style={{ color: "#FFF", fontSize: 22 }}>
            {name === "menu" ? "☰" : "✕"}
          </Text>
        )}
      />
    </View>
  );
}

// ─── Menu items data ─────────────────────────────────────────────────────────

type MyMenuItem = PixelMenuItem & { icon: string };

const MENU_ITEMS: MyMenuItem[] = [
  // Academic
  { key: "attendance", title: "Attendance", icon: "▣", color: "blue", category: "Academic", order: 1 },
  { key: "timetable", title: "Timetable", icon: "▦", color: "teal", category: "Academic", order: 2 },
  { key: "homework", title: "Homework", icon: "▤", color: "orange", category: "Academic", order: 3 },
  { key: "marks", title: "Marks", icon: "◈", color: "purple", category: "Academic", order: 4 },
  { key: "assignments", title: "Assignments", icon: "◇", color: "indigo", category: "Academic", order: 5 },
  // Communication
  { key: "notices", title: "Notices", icon: "△", color: "red", category: "Communication", order: 6 },
  { key: "messages", title: "Messages", icon: "◎", color: "blue", category: "Communication", order: 7 },
  { key: "chat", title: "Chat", icon: "◉", color: "green", category: "Communication", order: 8 },
  { key: "events", title: "Events", icon: "✦", color: "pink", category: "Communication", order: 9 },
  // Management
  { key: "students", title: "Students", icon: "◈", color: "cyan", category: "Management", order: 10 },
  { key: "fees", title: "Fees", icon: "◇", color: "amber", category: "Management", order: 11 },
  { key: "leaves", title: "Leaves", icon: "⬡", color: "lime", category: "Management", order: 12 },
  { key: "transport", title: "Transport", icon: "▣", color: "yellow", category: "Management", order: 13 },
];

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setIsDark((v) => !v) }}>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 13,
    marginTop: 2,
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },

  // Info Bar
  infoBar: {
    flexDirection: "row",
    marginHorizontal: 24,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 32,
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
  },
  infoValue: {
    fontSize: 22,
    fontWeight: "800",
  },
  infoLabel: {
    fontSize: 11,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  // Grid
  gridLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginHorizontal: 24,
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginBottom: 32,
  },

  // Demo buttons
  demoRow: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  demoBtn: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  demoBtnIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  demoBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },

  // Activity
  activityCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    gap: 12,
  },
  activityDot: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activityText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
  },
  activityTime: {
    fontSize: 11,
  },

  // Bottom Sheet rows
  sheetRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 14,
  },
  sheetIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F7FAFC",
    alignItems: "center",
    justifyContent: "center",
  },
  sheetLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A202C",
  },
  sheetDesc: {
    fontSize: 12,
    color: "#A0AEC0",
    marginTop: 2,
  },

  // Menu overlay header
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  menuHeaderTitle: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  // Menu item detail
  menuDetailHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 8,
  },
  menuDetailBack: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  menuDetailTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },
});
