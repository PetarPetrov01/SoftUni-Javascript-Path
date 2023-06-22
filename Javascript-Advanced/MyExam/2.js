class JobOffers {
    constructor(employer, position) {
        this.employer = employer
        this.position = position
        this.jobCandidates = []

    }

    jobApplication(candidates) {
        let result = []

        for (let candidate of candidates) {
            let [name, education, yearsExperience] = candidate.split('-')

            let findCandidate = this.jobCandidates.find(c => c.name == name)
            if (!findCandidate) {
                this.jobCandidates.push({ name, education, yearsExperience: Number(yearsExperience) })
                result.push(name)
            } else {
                if (Number(yearsExperience) > findCandidate.yearsExperience) {
                    findCandidate.yearsExperience = yearsExperience
                }
            }
        }
        return `You successfully added candidates: ${result.join(', ')}.`
    }

    jobOffer(chosenPerson) {
        let [name, minimalExperience] = chosenPerson.split('-')

        let findPerson = this.jobCandidates.find(c => c.name == name)

        if (!findPerson) {
            throw new Error(`${name} is not in the candidates list!`);
        }

        if (minimalExperience > findPerson.yearsExperience) {
            throw new Error(`${name} does not have enough experience as ${this.position}, minimum requirement is ${minimalExperience} years.`)
        }

        findPerson.yearsExperience = 'hired'

        return `Welcome aboard, our newest employee is ${name}.`
    }

    salaryBonus(name) {
        let findPerson = this.jobCandidates.find(c => c.name == name)
        if (!findPerson) {
            throw new Error(`${name} is not in the candidates list!`);
        }

        if (findPerson.education == 'Bachelor') {
            return `${name} will sign a contract for ${this.employer}, as ${this.position} with a salary of $50,000 per year!`
        } else if (findPerson.education == 'Master') {
            return `${name} will sign a contract for ${this.employer}, as ${this.position} with a salary of $60,000 per year!`
        } else {
            return `${name} will sign a contract for ${this.employer}, as ${this.position} with a salary of $40,000 per year!`
        }
    }

    candidatesDatabase() {
        if (this.jobCandidates.length == 0) {
            throw new Error("Candidate Database is empty!")
        }

        let sorted = this.jobCandidates
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(c => `${c.name}-${c.yearsExperience}`)

        return `Candidates list:\n${sorted.join('\n')}`
    }
}

let Jobs = new JobOffers ("Google", "Strategy Analyst");
 console.log(Jobs.jobApplication(["John Doe-Bachelor-10", "Peter Parker-Master-5","Jordan Cole-High School-5", "Daniel Jones- Bachelor-18"]));
 console.log(Jobs.jobOffer("John Doe-8"));
 console.log(Jobs.jobOffer("Peter Parker-4"));
 console.log(Jobs.jobOffer("Jordan Cole-4"));
 console.log(Jobs.salaryBonus("Jordan Cole"));
 console.log(Jobs.salaryBonus("John Doe"));
 console.log(Jobs.candidatesDatabase());



 'You successfully added candidates: John Doe, Peter Parker, Daniel Jones'
 'You successfully added candidates: John Doe, Peter Parker, Daniel Jones.'