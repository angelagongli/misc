using System;
using System.Collections.Generic;
using System.Linq;

namespace translate
{
    public class Days
    {
        public void Day1()
        {
            string[] rawArr = System.IO.File.ReadAllLines(@"../data/elfCalories.txt");
            int i = 0;
            List<int> rollupList = new List<int> {0};
            foreach (string line in rawArr)
            {
                if (Int32.TryParse(line, out int j)) {
                    rollupList[i] += j;
                } else {
                    i++;
                    rollupList.Add(0);
                }
            }
            int max = (int)rollupList.Aggregate(Double.MinValue, (a, b) => Math.Max(a, b));
            Console.WriteLine(max);
        }

        public void Day2()
        {
            string[] rawArr = System.IO.File.ReadAllLines(@"../data/rockPaperScissors.txt");
            int score = 0;
            int round = 0;
            foreach (string line in rawArr)
            {
                char opp = line[0];
                char self = line[2];
                if (opp == 'A') {
                    Console.WriteLine("Opp plays Rock");
                    if (self == 'X') {
                        Console.WriteLine("I play Rock");
                        score += 4;
                    } else if (self == 'Y') {
                        Console.WriteLine("I play Paper");
                        score += 8;
                    } else {
                        Console.WriteLine("I play Scissors");
                        score += 3;
                    }
                } else if (opp == 'B') {
                    Console.WriteLine("Opp plays Paper");
                    if (self == 'X') {
                        Console.WriteLine("I play Rock");
                        score += 1;
                    } else if (self == 'Y') {
                        Console.WriteLine("I play Paper");
                        score += 5;
                    } else {
                        Console.WriteLine("I play Scissors");
                        score += 9;
                    }
                } else {
                    Console.WriteLine("Opp plays Scissors");
                    if (self == 'X') {
                        Console.WriteLine("I play Rock");
                        score += 7;
                    } else if (self == 'Y') {
                        Console.WriteLine("I play Paper");
                        score += 2;
                    } else {
                        Console.WriteLine("I play Scissors");
                        score += 6;
                    }
                }
                Console.WriteLine("Round {0}: {1}", ++round, score);
            }
            Console.WriteLine("Final score: " + score);
        }

        public void Day3()
        {
            string[] rawArr = System.IO.File.ReadAllLines(@"../data/rucksackContents.txt");
            int priorityAll = 0;
            char found = '*';
            foreach (string line in rawArr)
            {
                int halfway = line.Length/2;
                List<char> compartment1 = new List<char>();
                List<char> compartment2 = new List<char>();
                for (int i = 0; i < halfway; i++) {
                    char item1 = line[i];
                    char item2 = line[halfway + i];
                    if (compartment2.Contains(item1)) {
                        found = item1;
                    } else if (compartment1.Contains(item2)) {
                        found = item2;
                    } else {
                        compartment1.Add(item1);
                        compartment2.Add(item2);
                    }
                    if (found != '*') {
                        if (found == Char.ToLower(found)) {
                            priorityAll += (int)found - (int)'a' + 1;
                        } else {
                            priorityAll += (int)found - (int)'A' + 27;
                        }
                        found = '*';
                        break;
                    }
                }
            }
            Console.WriteLine(priorityAll);
        }

        public void Day4()
        {
            string[] rawArr = System.IO.File.ReadAllLines(@"../data/sectionAssignmentPairs.txt");
            int fullyContainCount = 0;
            foreach (string line in rawArr)
            {
                char[] delimiterChars = {',','-'};
                string[] splitLine = line.Split(delimiterChars);
                int x1 = Int32.Parse(splitLine[0]);
                int y1 = Int32.Parse(splitLine[1]);
                int x2 = Int32.Parse(splitLine[2]);
                int y2 = Int32.Parse(splitLine[3]);
                if ((x1 <= x2 && y1 >= y2) || (x2 <= x1 && y2 >= y1)) {
                    fullyContainCount++;
                }
            }
            Console.WriteLine(fullyContainCount);
        }

        public void Day5()
        {
            string[] rawArr = System.IO.File.ReadAllLines(@"../data/rearrangementProcedure.txt");
            int boundary = Array.FindIndex(rawArr, isBoundary);
            int stackCount = (int)Math.Ceiling((decimal)rawArr[0].Length / 4);
            List<char>[] stacks = new List<char>[stackCount];
            for (int i = 0; i < boundary - 1; i++)
            {
                for (int j = 0; j < stackCount; j++) {
                    if (rawArr[i][j * 4 + 1] != ' ') {
                        if (stacks[j] == null) {
                            stacks[j] = new List<char>{ rawArr[i][j * 4 + 1] };
                        } else {
                            stacks[j].Insert(0, rawArr[i][j * 4 + 1]);
                        }
                    }
                }
            }
            for (int i = boundary + 1; i < rawArr.Length; i++) {
                string[] procedureArr = rawArr[i].Split(' ');
                int crateCount = Int32.Parse(procedureArr[1]);
                for (int j = 0; j < crateCount; j++) {
                    stacks[Int32.Parse(procedureArr[5]) - 1].Add(stacks[Int32.Parse(procedureArr[3]) - 1][stacks[Int32.Parse(procedureArr[3]) - 1].Count - 1]);
                    stacks[Int32.Parse(procedureArr[3]) - 1].RemoveAt(stacks[Int32.Parse(procedureArr[3]) - 1].Count - 1);
                }
            }
            string topsOfStacks = "";
            Array.ForEach(stacks, stack => topsOfStacks += stack[stack.Count - 1]);
            Console.WriteLine(topsOfStacks);
        }

        private bool isBoundary(String s) {
            return s.Trim().Length == 0;
        }
    }
}
