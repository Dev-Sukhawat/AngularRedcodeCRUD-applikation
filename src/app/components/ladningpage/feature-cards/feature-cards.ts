import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-cards.html',
  styleUrl: './feature-cards.css',
})
export class FeatureCard {
  icon = input.required<string>();
  title = input.required<string>();
  desc = input.required<string>();
}
