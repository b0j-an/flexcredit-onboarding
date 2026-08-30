export interface OrgChartNode {
  id: string;
  title: string;
  holder?: string;
  department: string;
  color: string;
  category: 'governance' | 'executive' | 'management' | 'specialist' | 'operational';
  avatar?: string;
  description?: string;
  children?: OrgChartNode[];
  isHighlighted?: boolean;
}

export const completeOrgStructure: OrgChartNode = {
  id: 'skupstina',
  title: 'Skupština Društva',
  department: 'Vrhovno Upravljanje',
  color: '#003A53',
  category: 'governance',
  description: 'Vrhovni organ upravljanja društvom, donosi strateške odluke i postavlja ciljeve.',
  children: [
    {
      id: 'upravni-odbor',
      title: 'Upravni Odbor',
      department: 'Uprava',
      color: '#004B6B',
      category: 'governance',
      description: 'Nadzire poslovanje i upravlja strateškim pravcima kompanije.',
      children: [
        {
          id: 'spn-fta',
          title: 'Ovlašteno Lice SPN/FTA',
          department: 'Usklađenost',
          color: '#0F73A3',
          category: 'management',
          description: 'Sprečavanje pranja novca i finansiranja terorizma.',
        },
        {
          id: 'direktor-drustva',
          title: 'Direktor Društva',
          department: 'Izvršno Vođstvo',
          color: '#1696D4',
          category: 'executive',
          description: 'Zastupa društvo i vodi operativno poslovanje.',
          children: [
            {
              id: 'country-manager',
              title: 'Country Manager (BiH i CG)',
              holder: 'Radmila Bjeljac',
              avatar: '/assets/team/radmila-bjeljac.png',
              department: 'Top Menadžment',
              color: '#8DC63F',
              category: 'executive',
              description: 'Vodi sve operacije i strateški razvoj u Bosni i Hercegovini i Crnoj Gori.',
              children: [
                // 1. PRODAJA
                {
                  id: 'prodaja-root',
                  title: 'Sektor Prodaje',
                  department: 'Prodaja',
                  color: '#3B82F6',
                  category: 'management',
                  children: [
                    {
                      id: 'dir-prodaje',
                      title: 'Regionalni Direktor Prodaje',
                      department: 'Prodaja',
                      color: '#2563EB',
                      category: 'management',
                      children: [
                        {
                          id: 'menadzer-prodaje',
                          title: 'Menadžer Prodaje',
                          holder: 'Nenad Marjanović',
                          avatar: '/assets/team/nenad-marjanovic.jpg',
                          department: 'Prodaja',
                          color: '#1D4ED8',
                          category: 'management',
                          children: [
                            {
                              id: 'koordinator-promocija',
                              title: 'Koordinator Promotivnih Aktivnosti i Aktivacija',
                              holder: 'Dragan Ostić',
                              department: 'Prodaja',
                              color: '#60A5FA',
                              category: 'specialist',
                            },
                            {
                              id: 'regionalni-menadzeri',
                              title: 'Regionalni Menadžeri (7 regija)',
                              holder: '7 Regionalnih Menadžera',
                              department: 'Prodaja',
                              color: '#2563EB',
                              category: 'management',
                              description: 'Banja Luka, Prijedor, Doboj, Brčko, Bijeljina, Sarajevo, Trebinje.',
                              children: [
                                {
                                  id: 'menadzeri-kancelarija',
                                  title: 'Menadžeri Kancelarija',
                                  department: 'Prodaja',
                                  color: '#3B82F6',
                                  category: 'management',
                                  children: [
                                    {
                                      id: 'savjetnici-za-klijente',
                                      title: 'Savjetnici za Klijente (61 filijala)',
                                      department: 'Prodaja',
                                      color: '#93C5FD',
                                      category: 'operational',
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },

                // 2. MARKETING
                {
                  id: 'marketing-root',
                  title: 'Sektor Marketinga',
                  department: 'Marketing',
                  color: '#F59E0B',
                  category: 'management',
                  children: [
                    {
                      id: 'dir-marketinga',
                      title: 'Regionalni Direktor Marketinga',
                      holder: 'Mirna Đukić Švraka',
                      avatar: '/assets/team/mirna-djukic-svraka.png',
                      department: 'Marketing',
                      color: '#D97706',
                      category: 'executive',
                      children: [
                        {
                          id: 'menadzer-digital',
                          title: 'Menadžer za Digitalni Marketing',
                          holder: 'Igor Martinović',
                          department: 'Marketing',
                          color: '#F59E0B',
                          category: 'specialist',
                        },
                        {
                          id: 'pr-specijalista',
                          title: 'Specijalista za Marketing i PR',
                          holder: 'Rade Šegrt',
                          department: 'Marketing',
                          color: '#F59E0B',
                          category: 'specialist',
                          children: [
                            {
                              id: 'saradnik-marketing',
                              title: 'Saradnik u Marketingu',
                              department: 'Marketing',
                              color: '#FCD34D',
                              category: 'operational',
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },

                // 3. IT PODRŠKA
                {
                  id: 'it-root',
                  title: 'IT i Sigurnost IS',
                  department: 'IT Podrška',
                  color: '#64748B',
                  category: 'management',
                  children: [
                    {
                      id: 'it-menadzer',
                      title: 'Regionalni Menadžer za IT i Bezbjednost IS',
                      holder: 'Aljoša Trninić',
                      department: 'IT Podrška',
                      color: '#475569',
                      category: 'management',
                      children: [
                        {
                          id: 'it-koordinator',
                          title: 'Koordinator Tehničke Podrške i Mrežne Admin.',
                          holder: 'Mićo Stevandić',
                          department: 'IT Podrška',
                          color: '#64748B',
                          category: 'specialist',
                          children: [
                            {
                              id: 'sistem-admin',
                              title: 'Sistem Administrator',
                              holder: 'Dalibor Božinović',
                              department: 'IT Podrška',
                              color: '#94A3B8',
                              category: 'operational',
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },

                // 4. PRAVNA PODRŠKA & ZLP
                {
                  id: 'pravna-root',
                  title: 'Pravna Podrška i Usklađenost',
                  department: 'Pravna Podrška',
                  color: '#6366F1',
                  category: 'management',
                  children: [
                    {
                      id: 'zlp-sluzbenik',
                      title: 'Službenik za Zaštitu Ličnih Podataka (ZLP)',
                      department: 'Pravna Podrška',
                      color: '#4F46E5',
                      category: 'specialist',
                    },
                    {
                      id: 'rukovodilac-pravne',
                      title: 'Rukovodilac Službe za Pravnu Podršku',
                      holder: 'Andrea Mikić',
                      department: 'Pravna Podrška',
                      color: '#4F46E5',
                      category: 'management',
                      children: [
                        {
                          id: 'pravni-usklađenost',
                          title: 'Stručni Saradnik za Pravne Poslove i Usklađenost',
                          holder: 'Nikolija Ostojić',
                          department: 'Pravna Podrška',
                          color: '#6366F1',
                          category: 'specialist',
                        },
                        {
                          id: 'sudska-naplata',
                          title: 'Stručni Saradnik za Poslove Sudske Naplate',
                          holder: 'Aleksandar Žigić',
                          department: 'Pravna Podrška',
                          color: '#6366F1',
                          category: 'specialist',
                          children: [
                            {
                              id: 'admin-naplata',
                              title: 'Administrativni Saradnik za Naplatu Potraživanja',
                              department: 'Pravna Podrška',
                              color: '#A5B4FC',
                              category: 'operational',
                            },
                            {
                              id: 'asistent-sudska',
                              title: 'Asistent za Poslove Sudske Naplate',
                              holder: 'Aleksandra Đukić',
                              department: 'Pravna Podrška',
                              color: '#A5B4FC',
                              category: 'operational',
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },

                // 5. LJUDSKI RESURSI (HR)
                {
                  id: 'hr-root',
                  title: 'Ljudski Resursi (HR)',
                  department: 'Ljudski Resursi',
                  color: '#10B981',
                  category: 'management',
                  children: [
                    {
                      id: 'hr-menadzer',
                      title: 'Regionalni Menadžer Ljudskih Resursa',
                      holder: 'Sanja Knežević',
                      avatar: '/assets/team/sanja-knezevic.png',
                      department: 'Ljudski Resursi',
                      color: '#059669',
                      category: 'management',
                      children: [
                        {
                          id: 'hr-saradnik',
                          title: 'Saradnik u Ljudskim Resursima',
                          holder: 'Aleksandra Antešević Đurić',
                          avatar: '/assets/team/aleksandra-antesevic.png',
                          department: 'Ljudski Resursi',
                          color: '#10B981',
                          category: 'specialist',
                          description: 'Mentor za onboarding novih kadrova.',
                        },
                        {
                          id: 'radni-odnosi',
                          title: 'Saradnik za Radne Odnose',
                          holder: 'Svetozar Mišić / Marija Mitrović',
                          department: 'Ljudski Resursi',
                          color: '#34D399',
                          category: 'specialist',
                          description: 'Upravljanje ugovorima, pravima i statusom zaposlenih.',
                          isHighlighted: true,
                        }
                      ]
                    }
                  ]
                },

                // 6. RAČUNOVODSTVO, FINANSIJE I ADMINISTRACIJA
                {
                  id: 'finansije-root',
                  title: 'Računovodstvo, Finansije i Administracija',
                  department: 'Finansije i Računovodstvo',
                  color: '#8B5CF6',
                  category: 'management',
                  children: [
                    {
                      id: 'dir-finansija',
                      title: 'Direktor Finansija i Računovodstva',
                      holder: 'Nevena Ilić',
                      avatar: '/assets/team/nevena-ilic.png',
                      department: 'Finansije i Računovodstvo',
                      color: '#7C3AED',
                      category: 'executive',
                      children: [
                        // Podgrana: Finansijsko planiranje
                        {
                          id: 'fin-planiranje-root',
                          title: 'Finansijsko Planiranje, Izvještavanje i Admin.',
                          holder: 'Mira Cvijan (Menadžer)',
                          department: 'Finansije i Računovodstvo',
                          color: '#8B5CF6',
                          category: 'management',
                          children: [
                            {
                              id: 'fin-analiticar',
                              title: 'Finansijski Analitičar',
                              holder: 'Bojan Šikora',
                              department: 'Finansije i Računovodstvo',
                              color: '#A78BFA',
                              category: 'specialist',
                            },
                            {
                              id: 'biznis-analiticar',
                              title: 'Biznis Analitičar',
                              holder: 'Danijela Jungić',
                              department: 'Finansije i Računovodstvo',
                              color: '#A78BFA',
                              category: 'specialist',
                            },
                            {
                              id: 'koordinator-nabavki',
                              title: 'Koordinator Nabavki i Administracije',
                              holder: 'Jelena Pešević',
                              department: 'Finansije i Računovodstvo',
                              color: '#C4B5FD',
                              category: 'specialist',
                            },
                            {
                              id: 'vozni-park',
                              title: 'Vozač i Menadžer Voznog Parka',
                              holder: 'Aleksandar Brnić',
                              department: 'Finansije i Računovodstvo',
                              color: '#C4B5FD',
                              category: 'operational',
                            },
                            {
                              id: 'arhiva-saradnik',
                              title: 'Saradnik za Administraciju i Arhivu',
                              holder: 'Lana Nežić & Tatjana Lončar',
                              department: 'Finansije i Računovodstvo',
                              color: '#C4B5FD',
                              category: 'operational',
                            }
                          ]
                        },
                        // Podgrana: Finansije i Računovodstvo
                        {
                          id: 'fin-racunovodstvo-root',
                          title: 'Služba Finansija i Računovodstva',
                          holder: 'Jovana Jokić (Rukovodilac)',
                          department: 'Finansije i Računovodstvo',
                          color: '#8B5CF6',
                          category: 'management',
                          children: [
                            {
                              id: 'obracun-zarada',
                              title: 'Specijalista za Obračun Zarada',
                              holder: 'Gorana Janjetović',
                              department: 'Finansije i Računovodstvo',
                              color: '#A78BFA',
                              category: 'specialist',
                            },
                            {
                              id: 'fin-operativa',
                              title: 'Saradnik za Poslove Finansijske Operative',
                              holder: 'Jovana Puzić & Tamara Stojić',
                              department: 'Finansije i Računovodstvo',
                              color: '#A78BFA',
                              category: 'specialist',
                            },
                            {
                              id: 'saradnik-fin-racun',
                              title: 'Saradnik u Službi Finansija i Računovodstva',
                              department: 'Finansije i Računovodstvo',
                              color: '#C4B5FD',
                              category: 'operational',
                            },
                            {
                              id: 'admin-radnik',
                              title: 'Administrativni Radnik',
                              department: 'Finansije i Računovodstvo',
                              color: '#C4B5FD',
                              category: 'operational',
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },

                // 7. OPERATIVNA PODRŠKA
                {
                  id: 'operativna-root',
                  title: 'Operativna Podrška',
                  department: 'Operativna Podrška',
                  color: '#06B6D4',
                  category: 'management',
                  children: [
                    {
                      id: 'dir-operative',
                      title: 'Regionalni Operativni Direktor',
                      holder: 'Nataša Majstorović',
                      avatar: '/assets/team/natasa-majstorovic.png',
                      department: 'Operativna Podrška',
                      color: '#0891B2',
                      category: 'executive',
                      children: [
                        {
                          id: 'kreditni-specijalista',
                          title: 'Specijalista za Op. Podršku Kreditnom Poslovanju',
                          holder: 'Nataša Kovačević',
                          department: 'Operativna Podrška',
                          color: '#06B6D4',
                          category: 'specialist',
                        },
                        {
                          id: 'sistemska-unapredjenja',
                          title: 'Koordinator Projekata i Sistemskih Unapređenja',
                          holder: 'Suzana Dimitrovski',
                          department: 'Operativna Podrška',
                          color: '#06B6D4',
                          category: 'specialist',
                        },
                        // Kontakt Centar
                        {
                          id: 'kontakt-centar-root',
                          title: 'Kontakt Centar (40+ operatera)',
                          holder: 'Dejana Tominčić (Menadžer)',
                          department: 'Operativna Podrška',
                          color: '#06B6D4',
                          category: 'management',
                          children: [
                            {
                              id: 'analiticka-kc',
                              title: 'Koordinator Operativne i Analitičke Podrške',
                              holder: 'Milica Rokvić',
                              department: 'Operativna Podrška',
                              color: '#22D3EE',
                              category: 'specialist',
                            }
                          ]
                        },
                        // Služba Prodaje (Operativa)
                        {
                          id: 'sluzba-prodaje-op',
                          title: 'Služba Prodaje',
                          holder: 'Jelena Milidragović (Koordinator)',
                          department: 'Operativna Podrška',
                          color: '#06B6D4',
                          category: 'management',
                          children: [
                            {
                              id: 'operater-kc-prodaja',
                              title: 'Operater u Kontakt Centru - Prodaja',
                              department: 'Operativna Podrška',
                              color: '#67E8F9',
                              category: 'operational',
                            }
                          ]
                        },
                        // Služba Naplate
                        {
                          id: 'sluzba-naplate-op',
                          title: 'Služba Naplate',
                          holder: 'Nebojša Ćulum (Rukovodilac)',
                          department: 'Operativna Podrška',
                          color: '#06B6D4',
                          category: 'management',
                          children: [
                            {
                              id: 'koordinator-naplate',
                              title: 'Koordinator Službe Naplate',
                              holder: 'Suzana Popadić',
                              department: 'Operativna Podrška',
                              color: '#22D3EE',
                              category: 'specialist',
                            },
                            {
                              id: 'saradnik-naplata',
                              title: 'Saradnik za Naplatu',
                              department: 'Operativna Podrška',
                              color: '#67E8F9',
                              category: 'operational',
                            }
                          ]
                        },
                        // Kreditni Odjel & Rizici
                        {
                          id: 'kreditni-odjel-op',
                          title: 'Kreditni Odjel i Upravljanje Rizicima',
                          holder: 'Marina Lipovčić (Menadžer)',
                          department: 'Operativna Podrška',
                          color: '#06B6D4',
                          category: 'management',
                          children: [
                            {
                              id: 'kreditni-analiticar-op',
                              title: 'Kreditni Analitičar',
                              department: 'Operativna Podrška',
                              color: '#22D3EE',
                              category: 'specialist',
                            }
                          ]
                        },
                        // Terenska Naplata
                        {
                          id: 'terenska-naplata-op',
                          title: 'Terenska Naplata',
                          department: 'Operativna Podrška',
                          color: '#06B6D4',
                          category: 'management',
                          children: [
                            {
                              id: 'koord-terenska',
                              title: 'Koordinator Terenske Naplate',
                              department: 'Operativna Podrška',
                              color: '#22D3EE',
                              category: 'specialist',
                            },
                            {
                              id: 'saradnik-restruktura',
                              title: 'Saradnik za Restrukturu i Naplatu Riz. Portfolija',
                              department: 'Operativna Podrška',
                              color: '#67E8F9',
                              category: 'operational',
                            },
                            {
                              id: 'saradnik-terenska',
                              title: 'Saradnik za Terensku Naplatu',
                              department: 'Operativna Podrška',
                              color: '#67E8F9',
                              category: 'operational',
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },

                // 8. OSIGURANJE
                {
                  id: 'osiguranje-root',
                  title: 'Služba Osiguranja',
                  department: 'Osiguranje',
                  color: '#EC4899',
                  category: 'management',
                  children: [
                    {
                      id: 'rukovodilac-osiguranja',
                      title: 'Rukovodilac Službe za Zastupanje u Osiguranju',
                      department: 'Osiguranje',
                      color: '#DB2777',
                      category: 'management',
                      children: [
                        {
                          id: 'saradnik-osiguranje',
                          title: 'Saradnik za Zastupanje u Osiguranju',
                          department: 'Osiguranje',
                          color: '#F472B6',
                          category: 'specialist',
                        },
                        {
                          id: 'zastupnik-osiguranje',
                          title: 'Zastupnik u Osiguranju',
                          department: 'Osiguranje',
                          color: '#FBCFE8',
                          category: 'operational',
                        }
                      ]
                    },
                    {
                      id: 'biznis-dev-osiguranje',
                      title: 'Biznis Developer za Unapređenje Prodaje Osiguranja',
                      holder: 'Miloš Runić',
                      department: 'Osiguranje',
                      color: '#DB2777',
                      category: 'specialist',
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'odbor-reviziju',
      title: 'Odbor za Reviziju',
      department: 'Nadzor',
      color: '#004B6B',
      category: 'governance',
      description: 'Nezavisni nadzorni organ za finansijsko izvještavanje i internu kontrolu.',
      children: [
        {
          id: 'interna-revizija',
          title: 'Interna Revizija',
          department: 'Revizija i Kontrola',
          color: '#0F73A3',
          category: 'management',
          children: [
            {
              id: 'interni-revizor',
              title: 'Interni Revizor',
              holder: 'Vesna Milekić',
              department: 'Revizija i Kontrola',
              color: '#1696D4',
              category: 'specialist',
            },
            {
              id: 'interni-kontrolor',
              title: 'Interni Kontrolor',
              holder: 'Marko Pejić',
              department: 'Revizija i Kontrola',
              color: '#1696D4',
              category: 'specialist',
            }
          ]
        }
      ]
    }
  ]
};

export const departmentStats = [
  { id: 'top', name: 'Uprava i Nadzor', count: '4 funkcije', color: '#003A53', icon: 'Shield' },
  { id: 'prodaja', name: 'Prodaja (61 filijala)', count: '100+ zaposlenih', color: '#3B82F6', icon: 'Store' },
  { id: 'operativa', name: 'Operativna Podrška & KC', count: '50+ operatera', color: '#06B6D4', icon: 'Headphones' },
  { id: 'finansije', name: 'Finansije, Računovodstvo & Admin', count: '12 stručnjaka', color: '#8B5CF6', icon: 'Calculator' },
  { id: 'marketing', name: 'Marketing & Brending', count: '4 profesionalca', color: '#F59E0B', icon: 'Megaphone' },
  { id: 'hr', name: 'Ljudski Resursi (HR)', count: '3 člana tima', color: '#10B981', icon: 'Users' },
  { id: 'it', name: 'IT Podrška & Sigurnost', count: '3 inženjera', color: '#64748B', icon: 'Cpu' },
  { id: 'pravo', name: 'Pravna Podrška & ZLP', count: '4 pravnika', color: '#6366F1', icon: 'Scale' },
  { id: 'osiguranje', name: 'Osiguranje', count: '3 stručnjaka', color: '#EC4899', icon: 'HeartHandshake' },
];
