import { IButtonType } from './button.types';

export class Button {
  onClick: () => void;
  label: string;
  iconName: string;
  color: string;

  constructor(
    buttonType: IButtonType,
    onClick: () => void
  ) {
    this.onClick = onClick;
    this.label = buttonType.label;
    this.iconName = buttonType.iconName;
    if (buttonType.color) {
      this.color = buttonType.color;
    }
  }
}
