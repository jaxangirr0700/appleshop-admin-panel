import useGlobalStore from "../store/my-store";

export function DarkLight() {
  const state = useGlobalStore.getState();
  const newTheme = !state.theme;
  localStorage.setItem("theme", JSON.stringify(newTheme));

  useGlobalStore.setState({ theme: !state.theme });
}
