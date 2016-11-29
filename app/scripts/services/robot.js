'use strict';

/**
 * @ngdoc service
 * @name resumeApp.robot
 * @description
 * # robot
 * Factory in the resumeApp.
 */
angular.module('resumeApp')
  .factory('robot', function () {
    // Service logic

      var robotsarray = [
          {
              'view':'Guitar Robot',
              'type':'Kinetic Sculpture/Instrument',
              'img': 'images/if6were9.jpg',
              'ix':460 , 'iy': 670,
              'description':['MoPop (Seattle\'s Museum of Pop, originally EMP) If VI Were XI installation by Trimpin.', '',
                  'Installed in the EMP when it opened in 2000, this 44 string robot provides 6 electric guitars and 2 bass guitars ' +
                  'using MIDI input. It has been operating for 16 years now without any soft faults or bugs. ', '',
                  'All original hardware with moving parts other than the motors and encoders (like the MIDI sequencer) ' +
                  'failed and got replaced, but the robot itself (controller, servos and encoders) has  never had any issues. ' +
                  'Strings need tuning and strings and plucking surfaces have to be replaced every so often as they wear ' +
                  'down, otherwise no unplanned problems have occurred.'],
                  'longform': ['The guitar robots use solenoids pushing felt pads (Trimpin calls them frettles) against the guitar/bass fretboards to play different notes. ', '',
                  'A DC servomotor connected to a shaft with a small plastic or rubber protrusion is used to pluck the strings. ' +
                  'This is the plucker. The shaft of the plucker has two different picks, one is quite soft and the other is stiff. ', '',
                  'An 8051 microcontroller runs the robot, one microcontoller per string.', '',
                  'The 8051 takes MIDI input, checking the channel (one of 8, 6 guitars and 2 basses as mentioned) and only responding to one. ' +
                  'Each controller card has switches to set which channel that card listens to, and switches to determine which range of notes ' +
                  'this string responds to. Each string has 12 frettles, and the notes on one string overlap with the notes on the next string, ' +
                  'so Trimpin shifts the MIDI notes associated with each string further apart so that there is exactly one note available per frettle. ' +
                  'Note that this means there are gaps: low E to D# all map to the low E string, then the A above that maps to the A string - an octave ' +
                  'higher than it is in reality, but that avoids frets 5+ on the E string overlapping with the A string, so we know exactly which string ' +
                  'needs to have which frettle pushed.', '',
                  'The plucker maps the requested note volume to plucker velocity - the louder the note, the faster the pluck. ' +
                  'Between the velocity variance and the tendency for the plucker to not stop quite perfectly in the same spot after each pluck, as well ' +
                  'as the reversed motion in each successive pluck, the pucking is not mechanically perfect at all. ', '',
                  'There are tiny variances in the timing of the notes, with different strings also not perfectly synchronised. ' +
                  'If you reuest another note before we have finished 2/3 of the motion for the previous pluck om a string, we ignore it. ' +
                  'We simply can not pluck that quickly. After we have passed 2/3 of the pluck travel we will accept another pluck command and ' +
                  'immediately change direction to pluck again; this adds even more variance to the timing when notes are requested very quickly. ' +
                  'When we noticed this and I mentioned starting to nail down the variables to remove them, Trimpin asked me to leave it. ' +
                  'He noted that the instrument sounded more like a real live human played instrument: go to fast and it sounds just a bit sloppier, ' +
                  'go slower and it is more precise and steady.'],
              'longimage':'',
              'videos': []
          },
          {
              'view':'Der Ring 3',
              'type':'Kinetic Sculpture',
              'img': 'images/orbit.jpg',
              'ix':706 , 'iy': 466,
              'description':['Trimpin\'s Kinetic sculpture installation at the Phaeno Science Center in Wolfsberg, Germany. ', '',
                  'Trimpin mounted concentric 5, 10 and 15 meter diameter kinetic sculpture rings with large metal balls ' + '' +
                  'in them above the entrance to the science center. The balls can roll aroundin the rings freely, so they ' +
                  'will roll downwards or at least accelerate in that direction if they are already moving. ','',
                  'An external controller sending assorted commands to all 3 rings to put on a ' +
                  'show for the patrons below who are entering the center.','',
                  'This photo shows the 5 meter ring running in the Suyama Space in Seattle.'
              ],
              'longform': [
                  'Each ring is controlled by a 2 dimension real time trigonometry engine. We have 2 motors per CPU using HP ' +
                  'encoder resolver chips to track location based on the encoder pulses coming from the shaft encoders. ' +
                  'Each CPU also has dual H-bridge chips wired up to CPU outputs driving the servo-motors so we can ' +
                  'spin the motors either direction as needed.', '',
                  'The goal is to move things in a circle. Each motor controls one axis via wires from one side of ' +
                  'the suspended loop to the motor (i.e. a pulley) then back to the opposite side.  Move a motor one ' +
                  'way and one side lifts while the opposite drops, reverse and the ends reverse directions. ' +
                  'The other motor controls the other axis so both x and y are set using the location of a single motor each.', '',
                  'A low level real time interrupt process compares the current location on each axis (from the ' +
                  'encoder/resolvers) to the desired location (more on that shortly), adjusting the voltage to the ' +
                  'DC servos as needed to correct for errors. ', '',
                  'We also run a serial input processing loop which takes a command to set the execution state ' +
                  'of the 2 motors. We run a "circle" so one axis does a cosine while the other does a sine. ' +
                  'The single largest item in our ROM is the table of  2,048 sine values for a quadrant. Thus our ' +
                  'circle will actually be an eight thousand faced polygon, not quite a circle.', '',
                  'Using a serial port, a command to set the state feeds in 3 values:',
                  'Amplitude - how large is the peak/tough of the sine and cosine wave? 0 means no motion, value is a ' +
                  '32 bit fraction, so 0xffffffff is maximum amplitude.',
                  'Frequency - how fast do we progress through the table? This uses an 8 bit integer and 24 bit fraction.',
                  'Phase - where does the motion start on the circle? This value is preloaded, then after each time ' +
                  'interval we add in the frequency value, carrying from the fractional bit if needed, to determine the ' +
                  'new angle. That angle i converted to a sine and a cosine using the table, which is then converted to ' +
                  'actual x & y values by multiplying the signed results for cosine and sine by the amplitude.'
              ],
              'longimage':'',
              'videos': []
          },
          {
              'view':'Thermwood Routers',
              'type':'Industrial Machinery',
              'img': 'images/twood.jpeg',
              'ix':448 , 'iy': 271,
              'description': ['Real time control algorithms for routers, robots, carving machines, and 5+ axes of simultaneous control.'],
              'longform': ['Principle software engineer for several generations of motion control systems, ' +
                  'from the early pendant only systems in the 70s to the first PC compatible UIs in the 80s and beyond.', '',
                  'We did the early stepper motor based systems and then the faster, sronger and more precise DC servo ' +
                  'based systems. The first generation I was involved in moved to a 16/32 bit Z8000 CPU controlling ' +
                  'everything. Later we added a PC compatible front end (UI and storage) system with dedicated CPUs and ' +
                  'hardware running the real time control algorithms. FIFO based interfaces worked well for us. ' +
                  'Eventually we got to the Intel 386 and later CPUs so we also had floating point hardware which made ' +
                  'things (especially performance and accuracy) much easier.', '',
                  'In the early days it was all hand coded assembly language (using assemblers we had to write our selves) ' +
                  'transferred to the test system using tools we wrote, debugged using the debugger we wrote. Tools were ' +
                  'mostly roll your own, except for the edlin line editor. Pretty primitive days, we were still suing ' +
                  'punched aper tape to get bootstrapped when we started. We orked our way up the curve when we could - ' +
                  'going to a PC compatible for UI and storage (an eventually networking) got rid of major coding overhead.', '',
                  'Eventually we were able to take advantage of BASIC, then C and C++ for higher productivity. ' +
                  'Symbolic debuggers were amazing when we finally got them. In circuit emulators also made things nice ' +
                  'when we finally got those too.', '',
                  'Our latest work this decade has been based on open source brushless DC servo-motor controller software ' +
                  'running on Texas Instrument\'s Piccolo CPUs. Kits are only $200 or $300, which saves tens of thousands ' +
                  'of dollars in engineering costs. We start with a safely engineered self tuning solution that is probably ' +
                  'a better piece of engineering than I could create in the remaining decade or two of my career. ' +
                  'We run the latest solutions on open hardware - mostly Raspberry PI - which is cheap and well supported. ' +
                  'SPI drivers out of the box, web servers if we want them, asynchronous real time CPU support, plenty of ' +
                  'general purpose IO available, for $25 or $35, all the compilers and tools are free. It is amazing how ' +
                  'much is already done for us, better than we\'d have time and energy to do it, for free. Open source ' +
                  'software and hardware, near elimination of NRE costs and decreasing hardware costs just keeps making ' +
                  'things easier to do for way less money.'
              ],
              'longimage': 'images/twoodcontrol.png',
              'videos': [
                  {
                      'id': 0,
                      'name': 'Model 67',
                      'ytid': 'LkBFpjEhl-w'
                  },{
                      'id': 1,
                      'name': 'Model C50',
                      'ytid': 'KZyCI-X4YWQ'
                  }, {
                      'id': 2,
                      'name': 'Model 45',
                      'ytid': 'VAnweSpEkQ4'
                  }
              ]
          }
      ];

    // Public API here
    return {
        getRobot: function(ind) {
            if (!(ind  < 0) && !(ind > robotsarray.length)) {
                return robotsarray[ind];
            }
            return null;
        },

        getRobots: function() {
            return robotsarray;
        },
    };
  });
