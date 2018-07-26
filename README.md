# stashpile2
second time's the charm... this time in 3D! 

needs to complete MVP:
- [x] tiles!
- [x] 3d!
- [x] OrbitController.js (it's pretty amazing!)
- [x] tile onHover information! (mouse raycast -> tile index, currently part of debugUI)
- [x] player (placeholder + positioning on world)
- [x] movement controls (moves player avatar & OrbitControl camera + OrbitControl target)
- [ ] trees
- [ ] actions ( **c**hop tree, **g**rab wood... etc)
  - [ ] **c**hop ( also butcher) + direction key
  - [ ] **d**rop + direction (dd = drop center tile)
  - [ ] movement (hjkl + yubn (diagonals))
  - [ ] **g**rab + direction (gg = grab center tile)
- [ ] inventory (requires simple half world render / half menu area)
- [ ] simple vision system (blocked by trees)
- [ ] game time ticks (actions take ticks, movement is an action)
  - 1 tile = 1 meters?
  - 200 ticks = 1 second? (17280000 = 1 day)
  - basic move (brisk pace, average fitness... etc) 140 ticks?
  - sprinting as fast as possible = 30 ticks?, if speed is <=15 ticks per tile, you're superhuman (but you run out of breath in ~8 to 10 seconds, so roughly 1600 ticks, superhuman stamina >= 1600 ticks)
  - broken leg = +200% tick modifier? ()... etc
  - heal 1 health every 720000 ticks?, holding medkit allows healing to full... etc (balance)
- [ ] simple stats (health 0 = you die...)
  - in real life 2 days without water or 60 days without food = death
    - progressively get worse ailments * ( ticks_since_last_drink / 34560000), where you collapse & die at 34560000 ticks (2 days)
  - if full health = 100 points, then lose 1 every 
    - ailments * (ticks_since_last_food / 1036800000)
- [ ] some sort of challenge / enemy?

future 'full(er) game experience':
- [ ] more complex actions
  - [ ] us**e** + direction (ee = center tile, i = inventory)
  - [ ] **i**nventory show / list inventory (+ allow actions from item)
  - [ ] . = wait 100 ticks
  - [ ] **s**leep
  - [ ] **f**ire (equipped ranged weapon / throw)
- [ ] more complex wound system (health loss is 'per wound', and wounds can heal in parallel, variable wound types...)
  - 100 health 'points' is just for 'overal health', sustaining different wound types (or just 1 really bad one) can take you to 0.
- [ ] more complex vision system (camera at player view tile, render objects + count red pixels)
- [ ] complex targeting & hit system (camera at origin, render facing target, target material red, count red pixels)
- [ ] smell system (are there even enemies that smell you?)
- [ ] sound / noise system (actions & other things generate noise)
- [ ] height? ( tile volume or tile height?, tile volume would be cooler... & respects the 3d choice better)
- [ ] textures & lighting
- [ ] building / crafting?... content creation can of worms!
- [ ] lore... (can of worms!)
- [ ] stats, skills, experience, mutations... etc (can of worms!)
