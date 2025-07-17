from dataclasses import dataclass
from typing import List

import time

@dataclass
class ClassicGamemodes:
    death_match: int
    missile_launch: int
    vehicle_escort: int
    package_drop: int
    capture_point: int

@dataclass
class SquadMember:
    name: str
    uid: str
    level: int
    xp: int
    kills: int
    deaths: int
    br_wins: int
    classic_wins: ClassicGamemodes
    jumps: int
    coins: int
    kills_elo: float
    games_elo: float
    last_seen: int

    @property
    def kdr(self) -> float:
        return round(self.kills / self.deaths, 1) if self.deaths != 0 else float('inf')

@dataclass
class Squad:
    squad_name: str

    members: List[SquadMember]

    @property
    def classic_wins(self) -> ClassicGamemodes:
        total_death_match_wins = sum(member.classic_wins.death_match for member in self.members)
        total_missile_launch_wins = sum(member.classic_wins.missile_launch for member in self.members)
        total_vehicle_escort_wins = sum(member.classic_wins.vehicle_escort for member in self.members)
        total_package_drop_wins = sum(member.classic_wins.package_drop for member in self.members)
        total_capture_point_wins = sum(member.classic_wins.capture_point for member in self.members)

        return ClassicGamemodes(
            death_match=total_death_match_wins,
            missile_launch=total_missile_launch_wins,
            vehicle_escort=total_vehicle_escort_wins,
            package_drop=total_package_drop_wins,
            capture_point=total_capture_point_wins
        )

    @property
    def br_wins(self) -> int:
        return sum(member.br_wins for member in self.members)

    @property
    def kills(self) -> float:
        return sum(member.kills for member in self.members)
    @property
    def deaths(self) -> float:
        return sum(member.deaths for member in self.members)

    @property
    def kdr(self) -> float:
        return round(self.kills / self.deaths, 1) if self.deaths != 0 else float('inf')
    
    @property
    def avg_level(self) -> float:
        level = sum(member.level for member in self.members)
        return round(level / len(self.members), 1)
    
    @property
    def xp(self) -> int:
        return sum(member.xp for member in self.members)
    @property
    def avg_xp(self) -> float:
        return round(self.xp / len(self.members), 1)
    
    '''@property
    def kills_elo(self) -> float:
        return sum(member.kills_elo for member in self.members)'''
    @property
    def avg_kills_elo(self) -> float:
        kills_elo = sum(member.kills_elo for member in self.members)
        return round(kills_elo/len(self.members), 2)
    
    '''@property
    def games_elo(self) -> float:
        games_elo = sum(member.games_elo for member in self.members)
        return round(games_elo, 2)'''
    @property
    def avg_games_elo(self) -> float:
        games_elo = sum(member.games_elo for member in self.members)
        return round(games_elo/len(self.members), 2)
    
    @property
    def seen_recently(self) -> int:
        now = time.time()
        one_week_seconds = 604_800

        seen_recently = sum(((now - member.last_seen) <= one_week_seconds) for member in self.members)

        return seen_recently
    
    @property
    def coins(self) -> int:
        return sum(member.coins for member in self.members)