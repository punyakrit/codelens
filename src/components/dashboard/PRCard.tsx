"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ExternalLink, GitPullRequest } from 'lucide-react';
import { Button } from '../ui/button';

interface PRCardProps {
  pr: {
    id: string;
    title: string;
    bodySummary?: string | null;
    url?: string | null;
    user_login?: string | null;
    user_avatar_url?: string | null;
    user_github_url?: string | null;
    createdAt: Date;
  };
}

function PRCard({ pr }: PRCardProps) {
  const handleViewPR = () => {
    if (pr.url) {
      window.open(pr.url, '_blank');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <GitPullRequest className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
            <CardTitle className="text-sm sm:text-lg line-clamp-2 min-w-0">{pr.title}</CardTitle>
          </div>
          <Badge variant="secondary" className="ml-2 flex-shrink-0 text-xs">
            PR
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {pr.bodySummary && (
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
            {pr.bodySummary}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
              <AvatarImage src={pr.user_avatar_url || ''} alt={pr.user_login || ''} />
              <AvatarFallback className="text-xs">
                {pr.user_login?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs sm:text-sm text-muted-foreground truncate">
              {pr.user_login || 'Unknown'}
            </span>
          </div>
          
          {pr.url && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewPR}
              className="flex items-center gap-1 w-full sm:w-auto text-xs sm:text-sm"
            >
              <ExternalLink className="h-3 w-3" />
              View
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PRCard;
