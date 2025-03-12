import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'aoe-checkbox',
  imports: [FormsModule, CheckboxModule],
  templateUrl: './aoe-checkbox.component.html',
  styleUrl: './aoe-checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AoeCheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AoeCheckboxComponent implements ControlValueAccessor {
  value = false;
  disabled = false;
  onChange: (val: boolean | null) => void = () => undefined;
  onTouched: () => void = () => undefined;
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}
  writeValue(value: boolean | null) {
    this.value = value ?? false;
    this.changeDetectorRef.detectChanges();
  }
  registerOnChange(fn: (val: boolean | null) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.changeDetectorRef.detectChanges();
  }
  onChangeValue() {
    if (this.disabled) return;
    this.onChange(this.value);
    this.changeDetectorRef.detectChanges();
  }
}
