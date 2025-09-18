"use client";
import useProject from '@/hooks/use-project';
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function SearchBar() {
    const { projects, selectedProjectId, setSelectedProjectId, project } = useProject();
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const filteredProjects = useMemo(() => {
        if (!projects || !searchQuery.trim()) return projects || [];
        
        return projects.filter(project => 
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.repoUrl.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [projects, searchQuery]);

    const handleProjectSelect = (projectId: string) => {
        setSelectedProjectId(projectId);
        setIsOpen(false);
        setSearchQuery('');
    };

    const selectedProject = projects?.find(p => p.id === selectedProjectId);

    return (
        <div className="relative w-full max-w-md sm:max-w-lg">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="pl-10 pr-10 border-none w-full text-sm sm:text-base" 
                />
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                </Button>
            </div>

            {isOpen && (
                <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-60 sm:max-h-80 overflow-y-auto">
                    <CardContent className="p-2">
                        {filteredProjects.length === 0 ? (
                            <div className="text-center py-4 text-muted-foreground">
                                {searchQuery ? 'No projects found' : 'No projects available'}
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {filteredProjects.map((proj) => (
                                    <div
                                        key={proj.id}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors hover:bg-muted/50",
                                            selectedProjectId === proj.id && "bg-muted"
                                        )}
                                        onClick={() => handleProjectSelect(proj.id)}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-sm truncate">
                                                    {proj.name}
                                                </h4>
                                                {selectedProjectId === proj.id && (
                                                    <Check className="h-4 w-4 text-primary" />
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate mt-1">
                                                {proj.repoUrl}
                                            </p>
                                        </div>
                                        {selectedProjectId === proj.id && (
                                            <Badge variant="secondary" className="ml-2">
                                                Selected
                                            </Badge>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

        </div>
    );
}

export default SearchBar;