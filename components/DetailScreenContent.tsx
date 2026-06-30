import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { type AppItem } from "../data/apps";

// ─── Dashboard ───────────────────────────────────────────────────────────────
function DashboardContent({ color }: { color: string }) {
  const bars = [50, 75, 60, 90, 70, 85, 65];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const stats = [
    { label: "Total Revenue", value: "$48,295", change: "+14%" },
    { label: "New Orders", value: "1,284", change: "+9%" },
    { label: "Active Users", value: "3,741", change: "+21%" },
    { label: "Conversion", value: "5.8%", change: "+2%" },
  ];
  return (
    <ScrollView contentContainerStyle={styles.contentPad}>
      <Text style={styles.sectionTitle}>Weekly Sales</Text>
      <View style={styles.barChart}>
        {bars.map((h, i) => (
          <View key={i} style={styles.barCol}>
            <View style={[styles.bar, { height: h * 1.4, backgroundColor: color }]} />
            <Text style={styles.barLabel}>{days[i]}</Text>
          </View>
        ))}
      </View>
      <Text style={[styles.sectionTitle, { marginTop: 28 }]}>Key Metrics</Text>
      <View style={styles.metricsGrid}>
        {stats.map((s) => (
          <View key={s.label} style={[styles.metricCard, { borderLeftColor: color, borderLeftWidth: 3 }]}>
            <Text style={styles.metricLabel}>{s.label}</Text>
            <Text style={styles.metricValue}>{s.value}</Text>
            <View style={[styles.badge, { backgroundColor: color + "22" }]}>
              <Text style={[styles.badgeText, { color }]}>{s.change}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ─── Orders ──────────────────────────────────────────────────────────────────
function OrdersContent({ color }: { color: string }) {
  const orders = [
    { id: "#ORD-4821", customer: "Sarah Johnson", amount: "$124.00", status: "Delivered", statusColor: "#38A169" },
    { id: "#ORD-4820", customer: "Mark Williams", amount: "$89.50", status: "Shipped", statusColor: color },
    { id: "#ORD-4819", customer: "Emily Davis", amount: "$245.00", status: "Processing", statusColor: "#DD6B20" },
    { id: "#ORD-4818", customer: "James Brown", amount: "$67.00", status: "Delivered", statusColor: "#38A169" },
    { id: "#ORD-4817", customer: "Lisa Martinez", amount: "$310.00", status: "Cancelled", statusColor: "#E53E3E" },
    { id: "#ORD-4816", customer: "Tom Wilson", amount: "$182.00", status: "Shipped", statusColor: color },
  ];
  return (
    <ScrollView contentContainerStyle={styles.contentPad}>
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>🔍  Search orders...</Text>
      </View>
      <Text style={styles.sectionTitle}>Recent Orders</Text>
      {orders.map((o) => (
        <View key={o.id} style={styles.orderCard}>
          <View style={styles.orderTop}>
            <Text style={styles.orderId}>{o.id}</Text>
            <View style={[styles.statusPill, { backgroundColor: o.statusColor + "22" }]}>
              <Text style={[styles.statusText, { color: o.statusColor }]}>{o.status}</Text>
            </View>
          </View>
          <View style={styles.orderBottom}>
            <Text style={styles.orderCustomer}>{o.customer}</Text>
            <Text style={[styles.orderAmount, { color }]}>{o.amount}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Reports ─────────────────────────────────────────────────────────────────
function ReportsContent({ color }: { color: string }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const values = [42, 58, 47, 73, 65, 81];
  const reports = [
    { name: "Q2 Sales Summary", date: "Jun 1, 2026", size: "2.4 MB" },
    { name: "Monthly Revenue", date: "May 31, 2026", size: "1.1 MB" },
    { name: "User Growth Report", date: "May 28, 2026", size: "890 KB" },
    { name: "Inventory Status", date: "May 25, 2026", size: "3.2 MB" },
  ];
  return (
    <ScrollView contentContainerStyle={styles.contentPad}>
      <Text style={styles.sectionTitle}>Performance (6 Months)</Text>
      <View style={styles.barChart}>
        {values.map((h, i) => (
          <View key={i} style={styles.barCol}>
            <View style={[styles.bar, { height: h * 1.5, backgroundColor: color }]} />
            <Text style={styles.barLabel}>{months[i]}</Text>
          </View>
        ))}
      </View>
      <Text style={[styles.sectionTitle, { marginTop: 28 }]}>Saved Reports</Text>
      {reports.map((r) => (
        <View key={r.name} style={styles.reportRow}>
          <View style={[styles.reportIcon, { backgroundColor: color + "22" }]}>
            <Text style={{ fontSize: 20 }}>📄</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.reportName}>{r.name}</Text>
            <Text style={styles.reportMeta}>{r.date} · {r.size}</Text>
          </View>
          <Text style={{ color: "#A0AEC0", fontSize: 18 }}>↓</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Profile ─────────────────────────────────────────────────────────────────
function ProfileContent({ color }: { color: string }) {
  const fields = [
    { label: "Full Name", value: "Sourabh Patidar" },
    { label: "Email", value: "sourabh@example.com" },
    { label: "Phone", value: "+91 98765 43210" },
    { label: "Role", value: "Administrator" },
    { label: "Location", value: "Indore, India" },
    { label: "Member Since", value: "Jan 2024" },
  ];
  return (
    <ScrollView contentContainerStyle={styles.contentPad}>
      {/* Avatar */}
      <View style={styles.profileHeader}>
        <View style={[styles.bigAvatar, { backgroundColor: color }]}>
          <Text style={{ fontSize: 48 }}>👤</Text>
        </View>
        <Text style={styles.profileName}>Sourabh Patidar</Text>
        <View style={[styles.rolePill, { backgroundColor: color + "22" }]}>
          <Text style={[styles.roleText, { color }]}>Administrator</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Personal Info</Text>
      <View style={styles.settingCard}>
        {fields.map((f, idx) => (
          <View key={f.label} style={[styles.profileRow, idx < fields.length - 1 && styles.settingDivider]}>
            <Text style={styles.profileFieldLabel}>{f.label}</Text>
            <Text style={styles.profileFieldValue}>{f.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ─── Notifications ───────────────────────────────────────────────────────────
function NotificationsContent({ color }: { color: string }) {
  const alerts = [
    { icon: "📦", title: "New Order Received", body: "Order #4822 placed by Riya Shah", time: "2m ago", unread: true },
    { icon: "💳", title: "Payment Successful", body: "$245.00 received for ORD-4819", time: "18m ago", unread: true },
    { icon: "⚠️", title: "Low Stock Alert", body: "Item 'Blue Widget' has 3 units left", time: "1h ago", unread: true },
    { icon: "✅", title: "Report Ready", body: "Q2 Sales Summary is available", time: "3h ago", unread: false },
    { icon: "🛠️", title: "Maintenance Done", body: "Scheduled maintenance completed", time: "Yesterday", unread: false },
    { icon: "👤", title: "New User Signup", body: "Michael Lee joined the platform", time: "2 days ago", unread: false },
  ];
  return (
    <ScrollView contentContainerStyle={styles.contentPad}>
      <Text style={styles.sectionTitle}>Notifications</Text>
      {alerts.map((a) => (
        <View key={a.title} style={[styles.alertCard, a.unread && { borderLeftColor: color, borderLeftWidth: 3 }]}>
          <View style={[styles.alertIcon, { backgroundColor: color + "22" }]}>
            <Text style={{ fontSize: 20 }}>{a.icon}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.alertTitle, a.unread && { color: "#1A202C" }]}>{a.title}</Text>
            <Text style={styles.alertBody} numberOfLines={1}>{a.body}</Text>
            <Text style={styles.alertTime}>{a.time}</Text>
          </View>
          {a.unread && <View style={[styles.unreadDot, { backgroundColor: color }]} />}
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Payments ────────────────────────────────────────────────────────────────
function PaymentsContent({ color }: { color: string }) {
  const txns = [
    { label: "Order #4821", date: "Jun 8", amount: "+$124.00", type: "credit" },
    { label: "Refund #4812", date: "Jun 7", amount: "-$45.00", type: "debit" },
    { label: "Order #4820", date: "Jun 7", amount: "+$89.50", type: "credit" },
    { label: "Order #4819", date: "Jun 6", amount: "+$245.00", type: "credit" },
    { label: "Fee - Platform", date: "Jun 5", amount: "-$12.00", type: "debit" },
    { label: "Order #4818", date: "Jun 5", amount: "+$67.00", type: "credit" },
  ];
  return (
    <ScrollView contentContainerStyle={styles.contentPad}>
      {/* Balance Card */}
      <View style={[styles.balanceCard, { backgroundColor: color }]}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceValue}>$12,480.50</Text>
        <Text style={styles.balanceSub}>Updated just now</Text>
      </View>
      <Text style={styles.sectionTitle}>Transactions</Text>
      {txns.map((t) => (
        <View key={t.label + t.date} style={styles.txnRow}>
          <View style={[styles.txnIcon, { backgroundColor: t.type === "credit" ? "#F0FFF4" : "#FFF5F5" }]}>
            <Text style={{ fontSize: 18 }}>{t.type === "credit" ? "↑" : "↓"}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.txnLabel}>{t.label}</Text>
            <Text style={styles.txnDate}>{t.date}</Text>
          </View>
          <Text style={[styles.txnAmount, { color: t.type === "credit" ? "#38A169" : "#E53E3E" }]}>{t.amount}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Schedule ────────────────────────────────────────────────────────────────
function ScheduleContent({ color }: { color: string }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = [1, 2, 3, 4, 5, 6, 7];
  const today = 4;
  const events = [
    { time: "09:00 AM", title: "Team Standup", tag: "Meeting", tagColor: color },
    { time: "11:30 AM", title: "Client Call — Riya Shah", tag: "Call", tagColor: "#DD6B20" },
    { time: "02:00 PM", title: "Q2 Review Presentation", tag: "Presentation", tagColor: "#E53E3E" },
    { time: "04:00 PM", title: "Design Sync", tag: "Meeting", tagColor: color },
    { time: "06:00 PM", title: "Wrap-up & Planning", tag: "Internal", tagColor: "#718096" },
  ];
  return (
    <ScrollView contentContainerStyle={styles.contentPad}>
      {/* Mini Calendar Row */}
      <View style={styles.calRow}>
        {days.map((d, i) => (
          <View key={i} style={[styles.calDay, dates[i] === today && { backgroundColor: color }]}>
            <Text style={[styles.calDayLabel, dates[i] === today && { color: "#fff" }]}>{d}</Text>
            <Text style={[styles.calDate, dates[i] === today && { color: "#fff", fontWeight: "800" }]}>{dates[i]}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Today — Jun 4</Text>
      {events.map((e) => (
        <View key={e.time} style={styles.eventCard}>
          <View style={[styles.eventAccent, { backgroundColor: e.tagColor }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.eventTime}>{e.time}</Text>
            <Text style={styles.eventTitle}>{e.title}</Text>
          </View>
          <View style={[styles.eventTag, { backgroundColor: e.tagColor + "22" }]}>
            <Text style={[styles.eventTagText, { color: e.tagColor }]}>{e.tag}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Documents ───────────────────────────────────────────────────────────────
function DocumentsContent({ color }: { color: string }) {
  const folders = [
    { name: "Invoices", count: 34, icon: "🧾" },
    { name: "Contracts", count: 12, icon: "📝" },
    { name: "Assets", count: 58, icon: "🖼️" },
    { name: "Reports", count: 21, icon: "📊" },
  ];
  const files = [
    { name: "Q2_Final_Report.pdf", size: "2.4 MB", date: "Jun 8" },
    { name: "Contract_Riya.docx", size: "128 KB", date: "Jun 7" },
    { name: "Invoice_4821.pdf", size: "84 KB", date: "Jun 7" },
    { name: "Brand_Guidelines.pdf", size: "8.1 MB", date: "Jun 6" },
    { name: "Product_Roadmap.pptx", size: "5.3 MB", date: "Jun 5" },
  ];
  const extColor: Record<string, string> = { pdf: "#E53E3E", docx: color, pptx: "#DD6B20" };
  return (
    <ScrollView contentContainerStyle={styles.contentPad}>
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>🔍  Search files...</Text>
      </View>
      <Text style={styles.sectionTitle}>Folders</Text>
      <View style={styles.foldersRow}>
        {folders.map((f) => (
          <View key={f.name} style={[styles.folderCard, { borderColor: color + "33" }]}>
            <Text style={{ fontSize: 28, marginBottom: 6 }}>{f.icon}</Text>
            <Text style={styles.folderName}>{f.name}</Text>
            <Text style={styles.folderCount}>{f.count} files</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Recent Files</Text>
      {files.map((f) => {
        const ext = f.name.split(".").pop() ?? "pdf";
        return (
          <View key={f.name} style={styles.fileRow}>
            <View style={[styles.fileExt, { backgroundColor: (extColor[ext] ?? "#718096") + "22" }]}>
              <Text style={[styles.fileExtText, { color: extColor[ext] ?? "#718096" }]}>{ext.toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fileName} numberOfLines={1}>{f.name}</Text>
              <Text style={styles.fileMeta}>{f.size} · {f.date}</Text>
            </View>
            <Text style={{ color: "#A0AEC0" }}>⋯</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

// ─── Support ─────────────────────────────────────────────────────────────────
function SupportContent({ color }: { color: string }) {
  const tickets = [
    { id: "#TKT-091", subject: "Payment not reflecting", priority: "High", priorityColor: "#E53E3E", status: "Open" },
    { id: "#TKT-090", subject: "Export CSV not working", priority: "Medium", priorityColor: "#DD6B20", status: "In Progress" },
    { id: "#TKT-089", subject: "Duplicate invoice generated", priority: "Low", priorityColor: "#38A169", status: "Resolved" },
    { id: "#TKT-088", subject: "Dark mode glitch on iPad", priority: "Low", priorityColor: "#38A169", status: "Resolved" },
  ];
  const faqs = [
    "How do I reset my password?",
    "How to export order data?",
    "Where can I find invoices?",
  ];
  return (
    <ScrollView contentContainerStyle={styles.contentPad}>
      <View style={[styles.supportHero, { backgroundColor: color }]}>
        <Text style={styles.supportHeroTitle}>How can we help?</Text>
        <View style={styles.supportSearchBar}>
          <Text style={{ color: "#A0AEC0" }}>🔍  Describe your issue...</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>My Tickets</Text>
      {tickets.map((t) => (
        <View key={t.id} style={styles.ticketCard}>
          <View style={styles.ticketTop}>
            <Text style={styles.ticketId}>{t.id}</Text>
            <View style={[styles.statusPill, { backgroundColor: t.priorityColor + "22" }]}>
              <Text style={[styles.statusText, { color: t.priorityColor }]}>{t.priority}</Text>
            </View>
          </View>
          <Text style={styles.ticketSubject}>{t.subject}</Text>
          <Text style={[styles.ticketStatus, { color: t.status === "Open" ? color : "#A0AEC0" }]}>{t.status}</Text>
        </View>
      ))}
      <Text style={styles.sectionTitle}>FAQs</Text>
      {faqs.map((q) => (
        <View key={q} style={styles.faqRow}>
          <Text style={styles.faqQ} numberOfLines={1}>{q}</Text>
          <Text style={{ color: "#A0AEC0" }}>›</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
type Props = {
  app: AppItem;
  onClose: () => void;
};

export function DetailScreenContent({ app, onClose }: Props) {
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    switch (app.type) {
      case "dashboard":     return <DashboardContent color={app.color} />;
      case "orders":        return <OrdersContent color={app.color} />;
      case "reports":       return <ReportsContent color={app.color} />;
      case "profile":       return <ProfileContent color={app.color} />;
      case "notifications": return <NotificationsContent color={app.color} />;
      case "payments":      return <PaymentsContent color={app.color} />;
      case "schedule":      return <ScheduleContent color={app.color} />;
      case "documents":     return <DocumentsContent color={app.color} />;
      case "support":       return <SupportContent color={app.color} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: app.color, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{app.label}</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {renderContent()}
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  backIcon: { fontSize: 34, color: "#fff", lineHeight: 40 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },

  contentPad: { padding: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 12, fontWeight: "700", color: "#718096", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 },

  // Shared
  searchBar: { backgroundColor: "#F7FAFC", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 24 },
  searchText: { color: "#A0AEC0", fontSize: 14 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: "flex-start", marginTop: 6 },
  badgeText: { fontSize: 12, fontWeight: "700" },
  statusPill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: "700" },
  settingCard: { backgroundColor: "#F7FAFC", borderRadius: 16, overflow: "hidden" },
  settingDivider: { borderBottomWidth: 1, borderBottomColor: "#EDF2F7" },

  // Bar chart
  barChart: { flexDirection: "row", alignItems: "flex-end", height: 140, gap: 6, marginBottom: 4 },
  barCol: { flex: 1, alignItems: "center" },
  bar: { width: "100%", borderRadius: 6 },
  barLabel: { fontSize: 9, color: "#A0AEC0", marginTop: 4 },

  // Dashboard
  metricsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  metricCard: { width: "47.5%", backgroundColor: "#F7FAFC", borderRadius: 12, padding: 14 },
  metricLabel: { fontSize: 11, color: "#718096" },
  metricValue: { fontSize: 20, fontWeight: "800", color: "#1A202C", marginTop: 4 },

  // Orders
  orderCard: { backgroundColor: "#F7FAFC", borderRadius: 12, padding: 14, marginBottom: 10 },
  orderTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  orderId: { fontSize: 13, fontWeight: "700", color: "#1A202C" },
  orderBottom: { flexDirection: "row", justifyContent: "space-between" },
  orderCustomer: { fontSize: 13, color: "#718096" },
  orderAmount: { fontSize: 14, fontWeight: "700" },

  // Reports
  reportRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#EDF2F7", gap: 12 },
  reportIcon: { width: 44, height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  reportName: { fontSize: 14, fontWeight: "600", color: "#1A202C" },
  reportMeta: { fontSize: 12, color: "#A0AEC0", marginTop: 2 },

  // Profile
  profileHeader: { alignItems: "center", paddingVertical: 24 },
  bigAvatar: { width: 90, height: 90, borderRadius: 45, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  profileName: { fontSize: 20, fontWeight: "800", color: "#1A202C" },
  rolePill: { paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20, marginTop: 6, marginBottom: 24 },
  roleText: { fontSize: 12, fontWeight: "700" },
  profileRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 14, paddingHorizontal: 16 },
  profileFieldLabel: { fontSize: 13, color: "#718096" },
  profileFieldValue: { fontSize: 13, fontWeight: "600", color: "#1A202C" },

  // Notifications
  alertCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#F7FAFC", borderRadius: 12, padding: 14, marginBottom: 10, gap: 12 },
  alertIcon: { width: 44, height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  alertTitle: { fontSize: 14, fontWeight: "700", color: "#4A5568" },
  alertBody: { fontSize: 12, color: "#A0AEC0", marginTop: 2 },
  alertTime: { fontSize: 11, color: "#CBD5E0", marginTop: 4 },
  unreadDot: { width: 8, height: 8, borderRadius: 4 },

  // Payments
  balanceCard: { borderRadius: 20, padding: 24, marginBottom: 28, alignItems: "center" },
  balanceLabel: { fontSize: 13, color: "#fff", opacity: 0.8 },
  balanceValue: { fontSize: 40, fontWeight: "800", color: "#fff", marginTop: 4 },
  balanceSub: { fontSize: 12, color: "#fff", opacity: 0.6, marginTop: 4 },
  txnRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#EDF2F7", gap: 12 },
  txnIcon: { width: 40, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  txnLabel: { fontSize: 14, fontWeight: "600", color: "#1A202C" },
  txnDate: { fontSize: 12, color: "#A0AEC0", marginTop: 2 },
  txnAmount: { fontSize: 15, fontWeight: "700" },

  // Schedule
  calRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 28 },
  calDay: { flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: 12, marginHorizontal: 2 },
  calDayLabel: { fontSize: 11, color: "#A0AEC0" },
  calDate: { fontSize: 15, fontWeight: "600", color: "#1A202C", marginTop: 4 },
  eventCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#F7FAFC", borderRadius: 12, padding: 14, marginBottom: 10, gap: 12 },
  eventAccent: { width: 4, height: "100%", borderRadius: 2, alignSelf: "stretch" },
  eventTime: { fontSize: 11, color: "#A0AEC0" },
  eventTitle: { fontSize: 14, fontWeight: "600", color: "#1A202C", marginTop: 2 },
  eventTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  eventTagText: { fontSize: 11, fontWeight: "700" },

  // Documents
  foldersRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  folderCard: { width: "47.5%", backgroundColor: "#F7FAFC", borderRadius: 14, padding: 16, borderWidth: 1, alignItems: "center" },
  folderName: { fontSize: 13, fontWeight: "700", color: "#1A202C" },
  folderCount: { fontSize: 11, color: "#A0AEC0", marginTop: 2 },
  fileRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#EDF2F7", gap: 12 },
  fileExt: { width: 44, height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  fileExtText: { fontSize: 10, fontWeight: "800" },
  fileName: { fontSize: 13, fontWeight: "600", color: "#1A202C" },
  fileMeta: { fontSize: 11, color: "#A0AEC0", marginTop: 2 },

  // Support
  supportHero: { borderRadius: 20, padding: 24, marginBottom: 24 },
  supportHeroTitle: { fontSize: 20, fontWeight: "800", color: "#fff", marginBottom: 14 },
  supportSearchBar: { backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  ticketCard: { backgroundColor: "#F7FAFC", borderRadius: 12, padding: 14, marginBottom: 10 },
  ticketTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  ticketId: { fontSize: 12, fontWeight: "700", color: "#718096" },
  ticketSubject: { fontSize: 14, fontWeight: "600", color: "#1A202C" },
  ticketStatus: { fontSize: 12, fontWeight: "600", marginTop: 4 },
  faqRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#EDF2F7" },
  faqQ: { flex: 1, fontSize: 14, color: "#2D3748" },
});
