import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FeatureCard } from '../feature-cards/feature-cards';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, FeatureCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
