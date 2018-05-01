const Settings = props => {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Debug Settings</Text>}>
        <Toggle
          settingsKey="ludicrous"
          label="Ludicrous Mode"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Settings);