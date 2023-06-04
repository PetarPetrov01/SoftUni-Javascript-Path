function heroesOfCode(input) {
    let numOfHeroes = +input.shift()
    let heroesObj = {}
    for (let i = 0; i < numOfHeroes; i++) {
        let [name, health, mana] = input.shift().split(' ')
        heroesObj[name] = {
            health: +health,
            mana: +mana
        }
    }

    let line = input.shift()
    while (line !== 'End') {
        let [command, heroName, ...info] = line.split(' - ')

        switch (command) {
            case 'CastSpell':
                let neededMana = +info[0]
                let spellName = info[1]
                if (heroesObj[heroName].mana >= neededMana) {
                    heroesObj[heroName].mana -= neededMana
                    console.log(`${heroName} has successfully cast ${spellName} and now has ${heroesObj[heroName].mana} MP!`)
                } else {
                    console.log(`${heroName} does not have enough MP to cast ${spellName}!`)
                }
                break;
            case 'TakeDamage':
                let damage = +info[0]
                let attacker = info[1]
                heroesObj[heroName].health -= damage
                if (heroesObj[heroName].health > 0) {
                    console.log(`${heroName} was hit for ${damage} HP by ${attacker} and now has ${heroesObj[heroName].health} HP left!`);
                } else {
                    console.log(`${heroName} has been killed by ${attacker}!`);
                    delete heroesObj[heroName]
                }
                break;
            case 'Recharge':
                let rechargeAmount = +info[0]
                let oldMana = heroesObj[heroName].mana
                heroesObj[heroName].mana = Math.min(200, oldMana + rechargeAmount)
                console.log(`${heroName} recharged for ${heroesObj[heroName].mana - oldMana} MP!`);
                break;
            case 'Heal':
                let healAmount = +info[0]
                let oldHP = heroesObj[heroName].health
                heroesObj[heroName].health = Math.min(100, oldHP + healAmount)
                console.log(`${heroName} healed for ${heroesObj[heroName].health - oldHP} HP!`);
                break;
        }
        line = input.shift()
    }
    for(let hero in heroesObj){
        console.log(hero);
        console.log(`  HP: ${heroesObj[hero].health}`);
        console.log(`  MP: ${heroesObj[hero].mana}`);
    }
}
heroesOfCode(["2",
    "Solmyr 85 120",
    "Kyrre 99 50",
    "Heal - Solmyr - 10",
    "Recharge - Solmyr - 50",
    "TakeDamage - Kyrre - 66 - Orc",
    "CastSpell - Kyrre - 15 - ViewEarth",
    "End"
])