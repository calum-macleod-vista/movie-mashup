import {Component, OnInit} from '@angular/core';
import { NgParticlesModule } from 'ng-particles';
import { MoveDirection, ClickMode, HoverMode, OutMode, Engine, Container } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import { ClueManagerService } from '../clues/clue-manager/clue-manager.service';
import { Observable, map, of } from 'rxjs';
import {AsyncPipe, CommonModule} from '@angular/common';


@Component({
    selector: 'mm-animations',
    templateUrl: 'animations.component.html',
    styleUrls: ['animations.component.scss'],
    standalone: true,
    imports: [
        NgParticlesModule, CommonModule
    ],
  })
  export class AnimationsComponent implements OnInit {
    particlesOptions = {
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ['#ff3ca6', '#49438a', '#2f3193', '#1bce7c', '#ff9020']
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
            }
          },
          size: {
            value: 10,
            random: true,
            anim: {
              enable: false,
            }
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'bottom' as MoveDirection,
            random: false,
            straight: false,
            out_mode: 'out' as OutMode,
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        retina_detect: true
      };

      particlesOptions2 = {
        particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 800
              }
            },
            shape: {
              type: 'image',
              image: {
                src: 'assets/images/skull.png',
                width: 200,
                height: 200
              }
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
              }
            },
            size: {
              value: 10,
              random: true,
              anim: {
                enable: false,
              }
            },
            line_linked: {
              enable: false
            },
            move: {
              enable: true,
              speed: 6,
              direction: 'bottom' as MoveDirection,
              random: false,
              straight: false,
              out_mode: 'out' as OutMode,
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          retina_detect: true
      };
      
    
      async particlesInit(engine: Engine): Promise<void> {
        await loadSlim(engine);
      }
    
      particlesLoaded(container: Container): void {
        console.log(container);
      }
    constructor(private clueManagerService: ClueManagerService) {}
    public correctGuessCount$ : Observable<boolean> = of(false);
    public nillPoints$ : Observable<boolean> = of(false);
  
    ngOnInit() {
        this.correctGuessCount$ = this.clueManagerService.getCorrectGuesses().pipe(
            map((guesses) => {
              return guesses.length > 2
          })
        )

        this.nillPoints$ = this.clueManagerService.getRemainingPoints().pipe(
            map((points) => {
              return points === 0;
          })
        )
    }
  
  }