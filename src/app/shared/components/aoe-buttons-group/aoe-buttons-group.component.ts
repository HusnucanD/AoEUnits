import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'aoe-buttons-group',
  imports: [CommonModule],
  templateUrl: './aoe-buttons-group.component.html',
  styleUrl: './aoe-buttons-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AoeButtonsGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AoeButtonsGroupComponent implements ControlValueAccessor {
  options = input<string[]>([]);
  value: string | null = null;
  disabled = false;
  onChange: (val: string | null) => void = () => undefined;
  onTouched: () => void = () => undefined;
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}
  writeValue(value: string | null) {
    this.value = value;
    this.changeDetectorRef.detectChanges();
  }
  registerOnChange(fn: (val: string | null) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.changeDetectorRef.detectChanges();
  }
  onClickOption(option: string) {
    if (this.disabled) return;
    this.value = option;
    this.onChange(option);
    this.onTouched();
  }
}
