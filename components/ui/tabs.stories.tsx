import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The value of the tab that should be active when initially rendered',
    },
    value: {
      control: 'text',
      description: 'The controlled value of the tab to activate',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="rounded-md border p-4">
          <h3 className="mb-2 text-lg font-semibold">Account Settings</h3>
          <p className="text-muted-foreground text-sm">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="rounded-md border p-4">
          <h3 className="mb-2 text-lg font-semibold">Password Settings</h3>
          <p className="text-muted-foreground text-sm">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="rounded-md border p-4">
          <h3 className="mb-2 text-lg font-semibold">Overview</h3>
          <p className="text-muted-foreground text-sm">
            View your dashboard overview and key metrics.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="rounded-md border p-4">
          <h3 className="mb-2 text-lg font-semibold">Analytics</h3>
          <p className="text-muted-foreground text-sm">
            Detailed analytics and insights about your data.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="rounded-md border p-4">
          <h3 className="mb-2 text-lg font-semibold">Reports</h3>
          <p className="text-muted-foreground text-sm">Generate and view comprehensive reports.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList>
        <TabsTrigger value="tab1">Dashboard</TabsTrigger>
        <TabsTrigger value="tab2">Users</TabsTrigger>
        <TabsTrigger value="tab3">Products</TabsTrigger>
        <TabsTrigger value="tab4">Orders</TabsTrigger>
        <TabsTrigger value="tab5">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="rounded-md border p-4">
          <h3 className="text-lg font-semibold">Dashboard</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Your main dashboard with all the important information.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="rounded-md border p-4">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Manage your users and their permissions.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="rounded-md border p-4">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Browse and manage your product catalog.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab4">
        <div className="rounded-md border p-4">
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-muted-foreground mt-2 text-sm">View and process customer orders.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab5">
        <div className="rounded-md border p-4">
          <h3 className="text-lg font-semibold">Settings</h3>
          <p className="text-muted-foreground mt-2 text-sm">Configure your application settings.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const VariantComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Default Variant</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList variant="default">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="rounded-md border p-4">
              <p className="text-sm">Content for tab 1</p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="rounded-md border p-4">
              <p className="text-sm">Content for tab 2</p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="rounded-md border p-4">
              <p className="text-sm">Content for tab 3</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Line Variant</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList variant="line">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="rounded-md border p-4">
              <p className="text-sm">Content for tab 1</p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="rounded-md border p-4">
              <p className="text-sm">Content for tab 2</p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="rounded-md border p-4">
              <p className="text-sm">Content for tab 3</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Available</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab3">Available</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="rounded-md border p-4">
          <p className="text-sm">This tab is available</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="rounded-md border p-4">
          <p className="text-sm">This tab is disabled</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="rounded-md border p-4">
          <p className="text-sm">This tab is also available</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="home" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="home" className="flex-1">
          Home
        </TabsTrigger>
        <TabsTrigger value="profile" className="flex-1">
          Profile
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex-1">
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <div className="rounded-md border p-4">
          <h3 className="text-lg font-semibold">Home</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Welcome to your home page. Full width tabs example.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="profile">
        <div className="rounded-md border p-4">
          <h3 className="text-lg font-semibold">Profile</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            View and edit your profile information.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="rounded-md border p-4">
          <h3 className="text-lg font-semibold">Settings</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Manage your application settings and preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
