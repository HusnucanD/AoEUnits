import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  input,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';

@Component({
  selector: 'aoe-slider',
  imports: [FormsModule, SliderModule],
  templateUrl: './aoe-range-slider.component.html',
  styleUrl: './aoe-range-slider.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AoeRangeSliderComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AoeRangeSliderComponent implements ControlValueAccessor {
  min = input(0);
  max = input(100);
  value: number[] = [this.min(), this.max()];
  disabled = false;
  onChange: (val: number[] | null) => void = () => undefined;
  onTouched: () => void = () => undefined;
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}
  writeValue(value: number[] | null) {
    this.value = value ?? [this.min(), this.max()];
    this.changeDetectorRef.detectChanges();
  }
  registerOnChange(fn: (val: number[] | null) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.changeDetectorRef.detectChanges();
  }
  onChangeValue(event: SliderChangeEvent) {
    if (this.disabled) return;
    console.log(typeof event);
    this.value = [...(event.values ?? [this.min(), this.max()])];
    this.onChange(this.value);
    this.changeDetectorRef.detectChanges();
  }
}
