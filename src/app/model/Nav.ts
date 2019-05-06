interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Alunos',
    url: 'aluno',
    icon: 'fa fa-user'
  },
  {
    name: 'Restrições Alimentares',
    url: 'restricao-alimentar',
    icon: 'fa fa-leaf'
  },
    {
    name: 'Fornecedores',
    url: 'fornecedor',
    icon: 'fa fa-user'
  }
];
