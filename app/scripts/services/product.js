'use strict';

/**
 * @ngdoc service
 * @name resumeApp.product
 * @description
 * # product
 * Factory in the resumeApp.
 */
angular.module('resumeApp')
  .factory('product', function () {
      'use strict';

      var productsarray = [
          {
              'view':'EXTRA!',
              'type':'Attachmate Corp\'s 3270 Terminal Emulator',
              'img': 'images/Extra.jpg',
              'ix':500 , 'iy': 375,
              'description':['MS-DOS 3270 terminal emulation terminate-stay-resident application sold to Fortune 5000 minframe users', '',
              'Attachmate\'s first successful product was a 3270 coax controller card  for the PC ' +
              'bundled with terminal emulation software that supported the card. The 3270 coax card could emulate ' +
              'either an IBM 3270 or Irma 3270 adapter via selection switch, and the software worked with either ' +
              'kind of emulated hardware (IBM or Irma). The hardware implementation was well executed and ' +
              'the software ran flawlessly on the real IBM and Irma hardware too without any issues.'],
              'longform': ['I came along as Attachmate realized that the IBM 3270 hardware market (about 20 times bigger than ours) ' +
              'and the Irma 3270 hardware (about 3 times bigger) were worth pursuing in a software only strategy. ' +
              'We built the industry\'s first software only cross-hardware solution and started cleaning up. Unlike our ' +
              'original hardware-and-software bundled products with their costly coax adapters, the software only product ' +
              'was as cheap as the floppy disks we published it on. Attachmate started earning larger profits in the ' +
              'maturing software market, and we added "PU 2.0 over token ring" support to allow network based solutions, ' +
              'avoiding the cost of a 3270 coax adapter altogether, giving our customers even more ways to buy and use EXTRA!','',
              'As the market matured IBM, Novell and Irma sold produts using proprietary gateway technologies and at Attachmate ' +
              'we reverse engineered the protocols and added them to our clients. This allowed us to sell into existing competitor ' +
              'installations without requiring any infrastruture replacement or upgrading. We also added our own proprietary ' +
              'gateway protocol, and additional hardware options like SDLC (sate of the art for the time synchronous communications) ' +
              'and Apple Macintosh support over AppleTalk for our proprietary gateways.', '',
              'The EXTRA! product line ran as a terminate-stay-resident or TSR app. After loading it, you continued using your ' +
              'PC normally and hit a "hot-key" sequence to interupt your DOS app and bring up the terminal emulation interface.',
              'To make this work we turned MS-DOS into a multi-tasking operating system by intercepting DOS access and took over ' +
              'the timer interrupt too so that we could process communications tasks in the background. To keep memory consumption ' +
              'low on the DOS systems with their 640KB memory limit, we engineered EXTRA! to use the High Memory Area or HMA just ' +
              'above 1024MB on PC-AT (80286 based) systems, and if the system had EMS then we moved up to 96KB of our application ' +
              'into EMS memory, keeping our footprint down to 12KB. This was an amazing accompishment for a full featured emulator ' +
              'with 4 3270 sessions, 2 scratchpads sessions, 3270 file transfer support, IBM compliant 3270 APIs: LLAPI (low level), ' +
              'SRPI (send receive) and HLLAPI (high level).','',
              'By the time I finished working on the EXTRA! product line it had earned more than $100M and completely ' +
              'dominated the software 3270 terminal emulation market that did not exist when I started.'],
              'longimage': [],
              'videos': []
          },
          {
              'view':'EXTRA! Gateway Option',
              'type':'Attachmate Corp\'s MS-DOS based proprietary gateway',
              'img': 'images/Extra.jpg',
              'ix':500 , 'iy': 375,
              'description':['Based on the EXTRA! TSR architecture and it\'s ability to provide multitasking support we ' +
              'created a series of gateway products that provided passthrough 3270 session access over our proprietary ' +
              'protocol, basically streaming SNA traffic in both directions and managing SNA state and signalling via ' +
              'our proprietary protocol.'],
              'longform': ['Our gateways were very simple to setup and used patented auto-configuration ' +
              'features to figure out the SNA session configurations from the data stream. This allowed the gateway to ' +
              'correctly advertise and serve properly confgured sessions driven by the already existing SNA architecture. ' +
              'Our customer\'s mainframe, network admin and install folk all loved the simplicity and it won us many sales', '',
                  'By using an inexpensive PC and our new PU2.0/LU2.1 support we offered 128 client ' +
                  'sessions from a single low end IBM PC with 512KB. Clients often ran these gateways headless and keyboardless ' +
                  'in closets and frequently lost track of exactly where they were as they simply never needed to be serviced. ' +
                  'They were stable enough that they never needed to be rebooted and could be reset using SNA signalling normally. ' +
                  'We literally ran these for years without a failure in most cases.'],
              'longimage': '',
              'videos': []
          },
          {
              'view':'Host Print Server',
              'type':'Attachmate Corp\'s 3270 Print Server',
              'img': 'images/evantageHostPrintServer.JPG',
              'ix':200 , 'iy': 209,
              'description':['Cost effective PC based print service for 3270 mainframe applications. ', '', +
              'IBM\'s mainframe based printing services were quite expensive and laser printers for PCs were ' +
              'a cost effective way to compete. Our software solution used LAN based protocols to get the printer ' +
              'data streams and routed the results to the local or LAN attached printers.'],
              'longform': ['The flexible and easy to install and run solution was reasonably successful, but ' +
              'printing in 3270 solutions was a shrinking market overall, so this product served more as a checklist ' +
              'item for some customers, helping close deals that involved more important and expensive components.'],
              'longimage': [],
              'videos': []
          },
          {
              'view':'EXTRA! For Windows',
              'type':'Attachmate Corp\'s flagship TN3270 and TN5250 terminal emulator',
              'img': 'images/EXTRA4windows.jpeg',
              'ix':400 , 'iy': 300,
              'description':['I was the development lead for the effort to port Attachmates biggest product to 32 bit Windows ' +
              'from 16 bit Windows.','',
                  'We used some tricks with C++ assembly language code generation to automate the tracking of segmentation ' +
                  'issues caused by the switch from 16 bit (the old unpleasant 286 atchitecture that used 64K offsets into segments) ' +
                  'to 32 bit (no segment management, much cleaner). I came up with a simple automatic manipulation of the assembly ' +
                  'language code generated by Microsoft\'s C++ compiler that would trigger a linker error listing source module and ' +
                  'line number for every segmented referene that needed to be fixed. This paid off by simplifying the planning, sizing ' +
                  'and scheduling of our team\'s work. It also allowed us to track our progress - as each source module was properly ' +
                  'remediated it would disappear from the error log; at that point testing could begin since the systematic errors had ' +
                  'been removed. Our team got the EXTRA! for Windows 32 bit version out ahead of schedule with all functions working.' +
                  'By moving into the 32 bit markets quickly without losing any stability we were able to remain the dominant 3270 ' +
                  'terminal emulator as the Windows 32 bit transition took hold. Within 28 months the 32 bit version of EXTRA! for Windows ' +
                  'sold more than $100M.'],
              'longform': [''],
              'longimage': [],
              'videos': []
          },
          {
              'view':'SNA Gateway',
              'type':'Attachmate Corp\'s TN3270 and TN5250 SNA Gateway',
              'img': 'images/evantageHostPrintServer.JPG',
              'ix':200 , 'iy': 209,
              'description':['MS-DOS 3270 terminal emulation application sold to Fortune 5000 minframe users', '',
               'This was our first product using Microsoft\'s NT 4.0 platform. We used some novel features like IO ' +
               'Completion Ports to get groundbreaking scale, more than an order of magnitude ahead of our nearest competitor, supporting ' +
               '8192 sessions vs. our competitions 254. Combining that with our patented autoconfiguration technology and ' +
               'our product was years ahead of the competition. Attachmate made their money by selling copies of the emulator ' +
               'to the end users, so this product was pretty much given away to make our clients even more attractive.'],
              'longform': [''],
              'longimage': [],
              'videos': []
          }
      ];

      var prodobj = {
          getproduct: function(ind) {
              if (!(ind  < 0) && !(ind > productsarray.length)) {
                  return productsarray[ind];
              }
              return null;
          },

          getproducts: function() {
              return productsarray;
          }
      };
      // Public API here
      return prodobj;
  });
