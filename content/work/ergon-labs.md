---
title: Thermal characterisation and heatsink design for power electronics
org: Ergon Labs
role: Mechanical Engineering Intern
category: professional
location: Bangalore, India
start: 2023-06
end: 2023-07
summary: >-
  Measured the thermal behaviour of MOSFET packages and designed heatsink clips and
  casing airflow with parametric FEA and CFD.
highlights:
  - Thermal characterisation of MOSFET packages (TO-247, TO-220), with a MATLAB script that reads a serial port and calculates thermal resistance and temperatures.
  - Parametric structural FEA of heatsink clips in ANSYS Mechanical, based on the required force and deformation, generating around 100 designs.
  - Thermal analysis of the casing heatsink, optimising fan placement and heatsink geometry for airflow and lower temperatures in ANSYS Icepak and SOLIDWORKS Flow Simulation.
metrics:
  - { value: "~100", label: clip designs generated }
tools: [Ansys Mechanical, Ansys Icepak, SOLIDWORKS Flow Simulation, MATLAB]
tags: [Thermal testing & simulation, Structural FEA, CFD, Testing & validation]
doodle: ergon
order: 0
---

## Measuring MOSFET packages

Power transistors such as the **TO-247** and **TO-220** packages get hot, and how
well that heat escapes sets how hard they can be driven. I characterised them
thermally, using a MATLAB script that reads data over a serial port and calculates
**thermal resistance** and temperatures.

<!-- TODO: Describe the test setup (heater/load, thermocouples, microcontroller). A photo
     of the rig and one plot of temperature vs time would be great. -->

## Designing heatsink clips

A clip presses the transistor against the heatsink. It has to apply enough force
without over-stressing itself. I ran **parametric structural FEA** in ANSYS Mechanical,
varying the geometry against the required force and deformation, which produced
**around 100 designs**.

<!-- TODO: Which parameters did you vary? How did you pick the final design? -->

## Cooling the casing

For the enclosure, I optimised **fan placement and heatsink geometry** to increase
airflow and bring temperatures down, using ANSYS Icepak and SOLIDWORKS Flow Simulation.

<!-- TODO: Before/after temperatures or flow plots, if you have them. -->

## What I learned

<!-- TODO -->
