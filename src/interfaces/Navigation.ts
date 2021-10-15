export interface State {
  params: any;
}

export interface Navigation {
  navigate: (route: string, config?: any) => void;
  dangerouslyGetParent: () => any;
  getParam: (data: string) => any;
  goBack: () => any;
  state: State;
}
