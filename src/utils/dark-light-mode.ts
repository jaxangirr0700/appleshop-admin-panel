import useGlobalStore from "../store/my-store";

export function DarkLight() {
  const { newTheme } = useGlobalStore.getState();
  const newThemee = !newTheme;
  localStorage.setItem("theme", JSON.stringify(newTheme));

  useGlobalStore.setState({ newTheme: newThemee });
}
